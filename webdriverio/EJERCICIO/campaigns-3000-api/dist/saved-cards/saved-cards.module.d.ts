import { OnModuleInit } from '@nestjs/common';
import { SavedCardsRepository } from './saved-cards.repository';
export declare class SavedCardsModule implements OnModuleInit {
    private readonly savedCardsRepository;
    constructor(savedCardsRepository: SavedCardsRepository);
    onModuleInit(): Promise<void>;
}
