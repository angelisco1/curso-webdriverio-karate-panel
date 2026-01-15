import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        user: {
            id: number;
            username: string;
            email: string;
            role: "ADMIN" | "USER";
            created_at: number;
        };
        token: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        user: Omit<import("../users/entities/user.entity").UserEntity, "password_hash">;
        token: string;
    }>;
    validateToken(userId: number): Promise<Omit<import("../users/entities/user.entity").UserEntity, "password_hash"> | null>;
}
