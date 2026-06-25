import { CreateUserDto } from "src/users/dto/create-user.dto";

export function createUserDto(overrides: Partial<CreateUserDto> = {}): CreateUserDto {
    return {
        username: 'Michael Jackson',
        email: 'michael.j@example.com',
        password: 'Moonwalk',
        address: '1000 Thriller Ave',
        phoneNumber: '914342673',
        ...overrides,
    }
}
