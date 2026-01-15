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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const campaigns_repository_1 = require("../campaigns/campaigns.repository");
let StatsService = class StatsService {
    dbService;
    campaignsRepository;
    constructor(dbService, campaignsRepository) {
        this.dbService = dbService;
        this.campaignsRepository = campaignsRepository;
    }
    async getDashboardStats() {
        const activeSubscribers = await this.dbService.get("SELECT COUNT(*) as count FROM subscribers WHERE status = 'suscrito'");
        const totalCampaigns = await this.dbService.get('SELECT COUNT(*) as count FROM campaigns');
        const sentCampaigns = await this.dbService.get("SELECT COUNT(*) as count FROM campaigns WHERE status = 'enviada'");
        const avgOpenRate = await this.dbService.get("SELECT AVG(open_rate) as avg FROM campaigns WHERE status = 'enviada'");
        return {
            active_subscribers: activeSubscribers?.count || 0,
            total_campaigns: totalCampaigns?.count || 0,
            sent_campaigns: sentCampaigns?.count || 0,
            average_open_rate: avgOpenRate?.avg || 0,
        };
    }
    async getSubscriberStats() {
        const total = await this.dbService.get('SELECT COUNT(*) as count FROM subscribers');
        const byStatus = await this.dbService.all('SELECT status, COUNT(*) as count FROM subscribers GROUP BY status');
        return {
            total: total?.count || 0,
            by_status: byStatus,
        };
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        campaigns_repository_1.CampaignsRepository])
], StatsService);
//# sourceMappingURL=stats.service.js.map