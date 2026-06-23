import { CreateUserDto } from "src/users/dto/create-user.dto";

export function createUserDto(overrides: Partial<CreateUserDto> = {}): CreateUserDto {
    return {
        username: 'user',
        email: 'user@user.com',
        password: '123',
        address: 'abc',
        phoneNumber: '123',
        ...overrides,
    }
}
