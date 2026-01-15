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
exports.SubscribersService = void 0;
const common_1 = require("@nestjs/common");
const subscribers_repository_1 = require("./subscribers.repository");
const payments_service_1 = require("../payments/payments.service");
let SubscribersService = class SubscribersService {
    subscribersRepository;
    paymentsService;
    constructor(subscribersRepository, paymentsService) {
        this.subscribersRepository = subscribersRepository;
        this.paymentsService = paymentsService;
    }
    calculatePrice(categoryCount) {
        if (categoryCount === 0)
            return 0;
        if (categoryCount === 1)
            return 4.99;
        if (categoryCount <= 4) {
            return 4.99 + (categoryCount - 1) * 2;
        }
        return 4.99 + 6 + (categoryCount - 4) * 1;
    }
    async findAll(filters) {
        return this.subscribersRepository.findAll(filters);
    }
    async findById(id) {
        const subscriber = await this.subscribersRepository.findById(id);
        if (!subscriber) {
            throw new common_1.NotFoundException(`Subscriber #${id} not found`);
        }
        return subscriber;
    }
    async findByUserId(userId) {
        return this.subscribersRepository.findByUserId(userId);
    }
    async create(createSubscriberDto) {
        const existing = await this.subscribersRepository.findByEmail(createSubscriberDto.email);
        const categoryCount = createSubscriberDto.interests?.length || 0;
        const amount = this.calculatePrice(categoryCount);
        if (existing) {
            if (existing.status === 'suscrito') {
                throw new common_1.ConflictException('Email already has an active subscription');
            }
            if (existing.status === 'baja' && existing.active_until) {
                const activeUntil = new Date(existing.active_until);
                const now = new Date();
                if (activeUntil > now) {
                    const formattedDate = activeUntil.toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    throw new common_1.BadRequestException(`Tu suscripción sigue activa hasta el ${formattedDate}. No puedes crear una nueva suscripción hasta que expire.`);
                }
            }
            const originalActiveUntil = existing.active_until;
            const activeUntil = new Date();
            activeUntil.setDate(activeUntil.getDate() + 30);
            const subscriber = await this.subscribersRepository.update(existing.id, {
                name: createSubscriberDto.name,
                status: 'suscrito',
                interests: createSubscriberDto.interests,
                user_id: createSubscriberDto.user_id,
                active_until: activeUntil.getTime(),
            });
            if (createSubscriberDto.cardNumber && amount > 0) {
                try {
                    await this.paymentsService.processPayment({
                        subscriber_id: subscriber.id,
                        card_number: createSubscriberDto.cardNumber,
                        amount: amount,
                    });
                }
                catch (error) {
                    await this.subscribersRepository.update(existing.id, {
                        status: 'baja',
                        active_until: originalActiveUntil
                    });
                    throw error;
                }
            }
            return subscriber;
        }
        const activeUntil = new Date();
        activeUntil.setDate(activeUntil.getDate() + 30);
        const subscriber = await this.subscribersRepository.create({
            ...createSubscriberDto,
            active_until: activeUntil.getTime(),
        });
        if (createSubscriberDto.cardNumber && amount > 0) {
            try {
                await this.paymentsService.processPayment({
                    subscriber_id: subscriber.id,
                    card_number: createSubscriberDto.cardNumber,
                    amount: amount,
                });
            }
            catch (error) {
                await this.subscribersRepository.delete(subscriber.id);
                throw error;
            }
        }
        return subscriber;
    }
    async update(id, updateData) {
        await this.findById(id);
        return this.subscribersRepository.update(id, updateData);
    }
    async cancel(id) {
        const subscriber = await this.findById(id);
        if (subscriber.status === 'baja') {
            throw new common_1.BadRequestException('Subscription is already cancelled');
        }
        return this.subscribersRepository.update(id, { status: 'baja' });
    }
    async delete(id) {
        await this.findById(id);
        return this.subscribersRepository.delete(id);
    }
};
exports.SubscribersService = SubscribersService;
exports.SubscribersService = SubscribersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [subscribers_repository_1.SubscribersRepository,
        payments_service_1.PaymentsService])
], SubscribersService);
//# sourceMappingURL=subscribers.service.js.map