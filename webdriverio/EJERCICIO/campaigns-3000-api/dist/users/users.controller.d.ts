import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<Omit<import("./entities/user.entity").UserEntity, "password_hash">[]>;
    findOne(id: string): Promise<Omit<import("./entities/user.entity").UserEntity, "password_hash"> | null>;
    create(createUserDto: CreateUserDto): Promise<Omit<import("./entities/user.entity").UserEntity, "password_hash">>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<import("./entities/user.entity").UserEntity, "password_hash">>;
    changePassword(id: string, changePasswordDto: ChangePasswordDto): Promise<void>;
}
