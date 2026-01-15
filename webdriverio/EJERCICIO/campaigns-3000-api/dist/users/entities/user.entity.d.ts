export declare class UserEntity {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    role: 'ADMIN' | 'USER';
    created_at: number;
}
