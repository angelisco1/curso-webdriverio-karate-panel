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
exports.CampaignsService = void 0;
const common_1 = require("@nestjs/common");
const campaigns_repository_1 = require("./campaigns.repository");
const subscribers_repository_1 = require("../subscribers/subscribers.repository");
let CampaignsService = class CampaignsService {
    campaignsRepository;
    subscribersRepository;
    constructor(campaignsRepository, subscribersRepository) {
        this.campaignsRepository = campaignsRepository;
        this.subscribersRepository = subscribersRepository;
    }
    async findAll(user) {
        if (!user || user.role === 'ADMIN') {
            const campaigns = await this.campaignsRepository.findAll();
            return { status: 'ok', campaigns };
        }
        const subscriber = await this.subscribersRepository.findByUserId(user.id);
        if (!subscriber) {
            return { status: 'no_subscription', campaigns: [] };
        }
        const isActive = subscriber.status === 'suscrito' ||
            (subscriber.status === 'baja' && subscriber.active_until && new Date(subscriber.active_until) > new Date());
        if (!isActive) {
            return { status: 'no_subscription', campaigns: [] };
        }
        const categories = subscriber.interests || [];
        if (categories.length === 0) {
            return { status: 'no_campaigns', campaigns: [] };
        }
        const campaigns = await this.campaignsRepository.findByCategoriesAndStatus(categories);
        if (campaigns.length === 0) {
            return { status: 'no_campaigns', campaigns: [] };
        }
        return { status: 'ok', campaigns };
    }
    async findById(id) {
        const campaign = await this.campaignsRepository.findById(id);
        if (!campaign) {
            throw new common_1.NotFoundException(`Campaign #${id} not found`);
        }
        return campaign;
    }
    create(createCampaignDto) {
        return this.campaignsRepository.create(createCampaignDto);
    }
    async update(id, updateData) {
        await this.findById(id);
        return this.campaignsRepository.update(id, updateData);
    }
    async delete(id) {
        await this.findById(id);
        return this.campaignsRepository.delete(id);
    }
    async getStats(id) {
        await this.findById(id);
        return this.campaignsRepository.getStats(id);
    }
    async trackOpen(campaignId, subscriberId) {
        return this.campaignsRepository.createEvent(campaignId, subscriberId, 'open');
    }
};
exports.CampaignsService = CampaignsService;
exports.CampaignsService = CampaignsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [campaigns_repository_1.CampaignsRepository,
        subscribers_repository_1.SubscribersRepository])
], CampaignsService);
//# sourceMappingURL=campaigns.service.js.map