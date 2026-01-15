import { DatabaseService } from '../database/database.service';
import { SavedCardEntity } from './entities/saved-card.entity';
export declare class SavedCardsRepository {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    onModuleInit(): Promise<void>;
    findByUserId(userId: number): Promise<SavedCardEntity[]>;
    findById(id: number): Promise<SavedCardEntity | undefined>;
    create(data: {
        user_id: number;
        card_number: string;
        expiry: string;
        cvv: string;
        is_default?: boolean;
    }): Promise<SavedCardEntity>;
    setDefault(id: number, userId: number): Promise<void>;
    delete(id: number): Promise<void>;
}
