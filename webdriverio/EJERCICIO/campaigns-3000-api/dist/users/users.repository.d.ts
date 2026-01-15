import { DatabaseService } from '../database/database.service';
import { UserEntity } from './entities/user.entity';
export declare class UsersRepository {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    findAll(): Promise<UserEntity[]>;
    findById(id: number): Promise<UserEntity | undefined>;
    findByUsername(username: string): Promise<UserEntity | undefined>;
    findByEmail(email: string): Promise<UserEntity | undefined>;
    create(data: {
        username: string;
        email: string;
        password_hash: string;
        role?: string;
    }): Promise<UserEntity>;
    update(id: number, data: Partial<Omit<UserEntity, 'id' | 'created_at'>>): Promise<UserEntity>;
    delete(id: number): Promise<void>;
}
