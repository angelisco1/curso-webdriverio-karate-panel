"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedCardsService = void 0;
const common_1 = require("@nestjs/common");
const saved_cards_repository_1 = require("./saved-cards.repository");
let SavedCardsService = class SavedCardsService {
    savedCardsRepository;
    constructor(savedCardsRepository) {
        this.savedCardsRepository = savedCardsRepository;
    }
    async findByUserId(userId) {
        const cards = await this.savedCardsRepository.findByUserId(userId);
        return cards.map(card => ({
            ...card,
            card_last4: card.card_number.slice(-4),
            is_default: !!card.is_default
        }));
    }
    async create(userId, createDto) {
        const existingCards = await this.savedCardsRepository.findByUserId(userId);
        const isDefault = existingCards.length === 0 || createDto.is_default;
        const card = await this.savedCardsRepository.create({
            user_id: userId,
            card_number: createDto.card_number.replace(/\s/g, ''),
            expiry: createDto.expiry,
            cvv: createDto.cvv,
            is_default: isDefault
        });
        if (isDefault && existingCards.length > 0) {
            await this.savedCardsRepository.setDefault(card.id, userId);
        }
        return {
            ...card,
            card_last4: card.card_number.slice(-4),
            is_default: !!card.is_default
        };
    }
    async setDefault(id, userId) {
        const card = await this.savedCardsRepository.findById(id);
        if (!card) {
            throw new common_1.NotFoundException('Card not found');
        }
        if (card.user_id !== userId) {
            throw new common_1.ForbiddenException('Not authorized');
        }
        await this.savedCardsRepository.setDefault(id, userId);
        return { success: true };
    }
    async delete(id, userId) {
        const card = await this.savedCardsRepository.findById(id);
        if (!card) {
            throw new common_1.NotFoundException('Card not found');
        }
        if (card.user_id !== userId) {
            throw new common_1.ForbiddenException('Not authorized');
        }
        await this.savedCardsRepository.delete(id);
        if (card.is_default) {
            const remainingCards = await this.savedCardsRepository.findByUserId(userId);
            if (remainingCards.length > 0) {
                await this.savedCardsRepository.setDefault(remainingCards[0].id, userId);
            }
        }
        return { success: true };
    }
    async getFullCard(id, userId) {
        const card = await this.savedCardsRepository.findById(id);
        if (!card) {
            throw new common_1.NotFoundException('Card not found');
        }
        if (card.user_id !== userId) {
            throw new common_1.ForbiddenException('Not authorized');
        }
        return card;
    }
};
exports.SavedCardsService = SavedCardsService;
exports.SavedCardsService = SavedCardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [saved_cards_repository_1.SavedCardsRepository])
], SavedCardsService);
//# sourceMappingURL=saved-cards.service.js.map