import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserEntity } from './entities/user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    findAll(): Promise<Omit<UserEntity, 'password_hash'>[]>;
    findById(id: number): Promise<Omit<UserEntity, 'password_hash'> | null>;
    findByUsername(username: string): Promise<UserEntity | null>;
    create(createUserDto: CreateUserDto): Promise<Omit<UserEntity, 'password_hash'>>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<UserEntity, 'password_hash'>>;
    changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<void>;
    validateUser(username: string, password: string): Promise<UserEntity | null>;
}
