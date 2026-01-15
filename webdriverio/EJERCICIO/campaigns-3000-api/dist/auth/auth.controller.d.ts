import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
