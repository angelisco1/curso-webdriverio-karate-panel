import { DatabaseService } from '../database/database.service';
import { SubscriberEntity } from './entities/subscriber.entity';
import { FilterSubscriberDto } from './dto/filter-subscriber.dto';
export declare class SubscribersRepository {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    findAll(filters?: FilterSubscriberDto): Promise<SubscriberEntity[]>;
    findById(id: number): Promise<SubscriberEntity | undefined>;
    findByEmail(email: string): Promise<SubscriberEntity | undefined>;
    findByUserId(userId: number): Promise<SubscriberEntity | undefined>;
    create(data: {
        name: string;
        email: string;
        interests?: string[];
        user_id?: number;
        active_until?: number;
    }): Promise<SubscriberEntity>;
    update(id: number, data: Partial<Omit<SubscriberEntity, 'id' | 'created_at'>>): Promise<SubscriberEntity>;
    delete(id: number): Promise<void>;
}
