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
exports.PaymentsRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let PaymentsRepository = class PaymentsRepository {
    dbService;
    constructor(dbService) {
        this.dbService = dbService;
    }
    async create(data) {
        const createdAt = Date.now();
        const result = await this.dbService.run('INSERT INTO payments (subscriber_id, card_number, amount, status, error_message, created_at) VALUES (?, ?, ?, ?, ?, ?)', [
            data.subscriber_id,
            data.card_number,
            data.amount,
            data.status,
            data.error_message || null,
            createdAt,
        ]);
        return {
            id: result.lastID,
            ...data,
            created_at: createdAt,
        };
    }
    async findAll() {
        return this.dbService.all('SELECT * FROM payments');
    }
    async findBySubscriberId(subscriberId) {
        return this.dbService.all('SELECT * FROM payments WHERE subscriber_id = ?', [subscriberId]);
    }
    async findLastSuccessfulBySubscriberId(subscriberId) {
        return this.dbService.get('SELECT * FROM payments WHERE subscriber_id = ? AND status = ? ORDER BY created_at DESC LIMIT 1', [subscriberId, 'success']);
    }
};
exports.PaymentsRepository = PaymentsRepository;
exports.PaymentsRepository = PaymentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], PaymentsRepository);
//# sourceMappingURL=payments.repository.js.map