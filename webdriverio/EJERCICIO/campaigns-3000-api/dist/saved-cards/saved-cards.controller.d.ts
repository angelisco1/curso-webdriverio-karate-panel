import { SavedCardsService } from './saved-cards.service';
import { CreateSavedCardDto } from './dto/create-saved-card.dto';
export declare class SavedCardsController {
    private readonly savedCardsService;
    constructor(savedCardsService: SavedCardsService);
    findAll(req: any): Promise<{
        card_last4: string;
        is_default: boolean;
        id: number;
        user_id: number;
        card_number: string;
        expiry: string;
        cvv: string;
        created_at: number;
    }[]>;
    create(req: any, createDto: CreateSavedCardDto): Promise<{
        card_last4: string;
        is_default: boolean;
        id: number;
        user_id: number;
        card_number: string;
        expiry: string;
        cvv: string;
        created_at: number;
    }>;
    setDefault(req: any, id: string): Promise<{
        success: boolean;
    }>;
    delete(req: any, id: string): Promise<{
        success: boolean;
    }>;
    getFullCard(req: any, id: string): Promise<import("./entities/saved-card.entity").SavedCardEntity>;
}
