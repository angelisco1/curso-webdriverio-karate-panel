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
exports.SavedCardsRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let SavedCardsRepository = class SavedCardsRepository {
    dbService;
    constructor(dbService) {
        this.dbService = dbService;
    }
    async onModuleInit() {
        await this.dbService.run(`
      CREATE TABLE IF NOT EXISTS saved_cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        card_number TEXT NOT NULL,
        expiry TEXT NOT NULL,
        cvv TEXT NOT NULL,
        is_default INTEGER DEFAULT 0,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    }
    async findByUserId(userId) {
        return this.dbService.all('SELECT * FROM saved_cards WHERE user_id = ? ORDER BY is_default DESC, created_at DESC', [userId]);
    }
    async findById(id) {
        return this.dbService.get('SELECT * FROM saved_cards WHERE id = ?', [id]);
    }
    async create(data) {
        const createdAt = Date.now();
        const result = await this.dbService.run('INSERT INTO saved_cards (user_id, card_number, expiry, cvv, is_default, created_at) VALUES (?, ?, ?, ?, ?, ?)', [data.user_id, data.card_number, data.expiry, data.cvv, data.is_default ? 1 : 0, createdAt]);
        return {
            id: result.lastID,
            user_id: data.user_id,
            card_number: data.card_number,
            expiry: data.expiry,
            cvv: data.cvv,
            is_default: data.is_default || false,
            created_at: createdAt
        };
    }
    async setDefault(id, userId) {
        await this.dbService.run('UPDATE saved_cards SET is_default = 0 WHERE user_id = ?', [userId]);
        await this.dbService.run('UPDATE saved_cards SET is_default = 1 WHERE id = ?', [id]);
    }
    async delete(id) {
        await this.dbService.run('DELETE FROM saved_cards WHERE id = ?', [id]);
    }
};
exports.SavedCardsRepository = SavedCardsRepository;
exports.SavedCardsRepository = SavedCardsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SavedCardsRepository);
//# sourceMappingURL=saved-cards.repository.js.map