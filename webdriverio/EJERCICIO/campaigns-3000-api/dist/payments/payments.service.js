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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const payments_repository_1 = require("./payments.repository");
const ERROR_CARDS = {
    '4000000000000002': { code: 'card_declined', message: 'La tarjeta ha sido rechazada' },
    '4000000000000051': { code: 'insufficient_funds', message: 'Fondos insuficientes' },
    '4000000000000069': { code: 'expired_card', message: 'La tarjeta ha expirado' },
    '4000000000000119': { code: 'processing_error', message: 'Error de procesamiento' },
};
let PaymentsService = class PaymentsService {
    paymentsRepository;
    constructor(paymentsRepository) {
        this.paymentsRepository = paymentsRepository;
    }
    async processPayment(processPaymentDto) {
        const { card_number, amount, subscriber_id } = processPaymentDto;
        const errorCard = ERROR_CARDS[card_number];
        if (errorCard) {
            await this.paymentsRepository.create({
                subscriber_id,
                card_number,
                amount,
                status: 'failed',
                error_message: errorCard.message,
            });
            throw new common_1.BadRequestException({
                message: errorCard.message,
                errorCode: errorCard.code,
            });
        }
        const payment = await this.paymentsRepository.create({
            subscriber_id,
            card_number,
            amount,
            status: 'success',
        });
        return payment;
    }
    findAll() {
        return this.paymentsRepository.findAll();
    }
    findBySubscriberId(subscriberId) {
        return this.paymentsRepository.findBySubscriberId(subscriberId);
    }
    async getLastCardBySubscriberId(subscriberId) {
        const payment = await this.paymentsRepository.findLastSuccessfulBySubscriberId(subscriberId);
        if (!payment)
            return null;
        const last4 = payment.card_number.slice(-4);
        return { last4 };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payments_repository_1.PaymentsRepository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map