import { SavedCardsRepository } from './saved-cards.repository';
import { CreateSavedCardDto } from './dto/create-saved-card.dto';
export declare class SavedCardsService {
    private readonly savedCardsRepository;
    constructor(savedCardsRepository: SavedCardsRepository);
    findByUserId(userId: number): Promise<{
        card_last4: string;
        is_default: boolean;
        id: number;
        user_id: number;
        card_number: string;
        expiry: string;
        cvv: string;
        created_at: number;
    }[]>;
    create(userId: number, createDto: CreateSavedCardDto): Promise<{
        card_last4: string;
        is_default: boolean;
        id: number;
        user_id: number;
        card_number: string;
        expiry: string;
        cvv: string;
        created_at: number;
    }>;
    setDefault(id: number, userId: number): Promise<{
        success: boolean;
    }>;
    delete(id: number, userId: number): Promise<{
        success: boolean;
    }>;
    getFullCard(id: number, userId: number): Promise<import("./entities/saved-card.entity").SavedCardEntity>;
}
