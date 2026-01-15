import { OnModuleDestroy } from '@nestjs/common';
import { Database } from 'sqlite3';
export declare class DatabaseService implements OnModuleDestroy {
    private db;
    constructor();
    getDatabase(): Database;
    run(sql: string, params?: any[]): Promise<{
        lastID: number;
        changes: number;
    }>;
    get<T = any>(sql: string, params?: any[]): Promise<T | undefined>;
    all<T = any>(sql: string, params?: any[]): Promise<T[]>;
    onModuleDestroy(): void;
}
