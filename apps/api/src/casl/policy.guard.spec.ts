import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ModuleRef } from '@nestjs/core';
import { PolicyGuard } from './policy.guard';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CHECK_POLICIES_KEY } from './check-policies.decorator';

const mockAbility = { can: jest.fn() };
const mockUser = { id: 1, username: 'john' };
const mockParams = { id: '42' };

const mockReflector = { get: jest.fn() };
const mockCaslAbilityFactory = { createForUser: jest.fn().mockReturnValue(mockAbility) };
const mockModuleRef = { get: jest.fn() };

const createMockContext = (user = mockUser, params = mockParams): ExecutionContext =>
  ({
    getHandler: jest.fn().mockReturnValue(() => {}),
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue({ user, params }),
    }),
  }) as unknown as ExecutionContext;

describe('PolicyGuard', () => {
  let guard: PolicyGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PolicyGuard,
        { provide: Reflector, useValue: mockReflector },
        { provide: CaslAbilityFactory, useValue: mockCaslAbilityFactory },
        { provide: ModuleRef, useValue: mockModuleRef },
      ],
    }).compile();

    guard = module.get<PolicyGuard>(PolicyGuard);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true when policy handler allows access', async () => {
      const mockHandler = { handle: jest.fn().mockResolvedValue(true) };
      const MockHandlerClass = jest.fn();

      mockReflector.get.mockReturnValue(MockHandlerClass);
      mockModuleRef.get.mockReturnValue(mockHandler);
      mockCaslAbilityFactory.createForUser.mockReturnValue(mockAbility);

      const context = createMockContext();
      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should return false when policy handler denies access', async () => {
      const mockHandler = { handle: jest.fn().mockResolvedValue(false) };
      const MockHandlerClass = jest.fn();

      mockReflector.get.mockReturnValue(MockHandlerClass);
      mockModuleRef.get.mockReturnValue(mockHandler);

      const context = createMockContext();
      const result = await guard.canActivate(context);

      expect(result).toBe(false);
    });

    it('should create ability for the current user', async () => {
      const mockHandler = { handle: jest.fn().mockResolvedValue(true) };
      mockReflector.get.mockReturnValue(jest.fn());
      mockModuleRef.get.mockReturnValue(mockHandler);

      const context = createMockContext(mockUser);
      await guard.canActivate(context);

      expect(mockCaslAbilityFactory.createForUser).toHaveBeenCalledWith(mockUser);
    });

    it('should pass ability and params to the policy handler', async () => {
      const mockHandler = { handle: jest.fn().mockResolvedValue(true) };
      mockReflector.get.mockReturnValue(jest.fn());
      mockCaslAbilityFactory.createForUser.mockReturnValue(mockAbility);
      mockModuleRef.get.mockReturnValue(mockHandler);

      const context = createMockContext(mockUser, mockParams);
      await guard.canActivate(context);

      expect(mockHandler.handle).toHaveBeenCalledWith(mockAbility, mockParams);
    });

    it('should resolve the policy handler with strict: false', async () => {
      const MockHandlerClass = jest.fn();
      const mockHandler = { handle: jest.fn().mockResolvedValue(true) };
      mockReflector.get.mockReturnValue(MockHandlerClass);
      mockModuleRef.get.mockReturnValue(mockHandler);

      const context = createMockContext();
      await guard.canActivate(context);

      expect(mockModuleRef.get).toHaveBeenCalledWith(MockHandlerClass, { strict: false });
    });

    it('should read the policy handler from reflector using CHECK_POLICIES_KEY', async () => {
      const MockHandlerClass = jest.fn();
      const mockHandler = { handle: jest.fn().mockResolvedValue(true) };
      mockReflector.get.mockReturnValue(MockHandlerClass);
      mockModuleRef.get.mockReturnValue(mockHandler);

      const context = createMockContext();
      await guard.canActivate(context);

      expect(mockReflector.get).toHaveBeenCalledWith(CHECK_POLICIES_KEY, context.getHandler());
    });
  });
});