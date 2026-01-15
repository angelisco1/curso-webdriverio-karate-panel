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
exports.CampaignsRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let CampaignsRepository = class CampaignsRepository {
    dbService;
    constructor(dbService) {
        this.dbService = dbService;
    }
    async findAll() {
        await this.dbService.run(`UPDATE campaigns
       SET status = 'enviada', sent_date = scheduled_date
       WHERE status = 'programada'
       AND scheduled_date IS NOT NULL
       AND scheduled_date <= ?`, [Date.now()]);
        const campaigns = await this.dbService.all('SELECT c.*, GROUP_CONCAT(cc.category) as categories FROM campaigns c LEFT JOIN campaign_categories cc ON c.id = cc.campaign_id GROUP BY c.id ORDER BY c.created_at DESC');
        return campaigns.map((c) => ({
            ...c,
            track_clicks: Boolean(c.track_clicks),
            categories: c.categories ? c.categories.split(',') : [],
        }));
    }
    async findByCategoriesAndStatus(categories) {
        if (!categories || categories.length === 0) {
            return [];
        }
        await this.dbService.run(`UPDATE campaigns
       SET status = 'enviada', sent_date = scheduled_date
       WHERE status = 'programada'
       AND scheduled_date IS NOT NULL
       AND scheduled_date <= ?`, [Date.now()]);
        const placeholders = categories.map(() => '?').join(',');
        const campaigns = await this.dbService.all(`SELECT DISTINCT c.*, GROUP_CONCAT(cc.category) as categories
       FROM campaigns c
       INNER JOIN campaign_categories cc ON c.id = cc.campaign_id
       WHERE c.status = 'enviada' AND cc.category IN (${placeholders})
       GROUP BY c.id
       ORDER BY c.created_at DESC`, categories);
        return campaigns.map((c) => ({
            ...c,
            track_clicks: Boolean(c.track_clicks),
            categories: c.categories ? c.categories.split(',') : [],
        }));
    }
    async findById(id) {
        const campaign = await this.dbService.get('SELECT c.*, GROUP_CONCAT(cc.category) as categories FROM campaigns c LEFT JOIN campaign_categories cc ON c.id = cc.campaign_id WHERE c.id = ? GROUP BY c.id', [id]);
        if (!campaign)
            return undefined;
        return {
            ...campaign,
            track_clicks: Boolean(campaign.track_clicks),
            categories: campaign.categories ? campaign.categories.split(',') : [],
        };
    }
    async create(data) {
        const campaignStatus = data.status || 'borrador';
        const sentDate = campaignStatus === 'enviada' ? Date.now() : null;
        const result = await this.dbService.run('INSERT INTO campaigns (name, subject, content, status, track_clicks, scheduled_date, sent_date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
            data.name,
            data.subject,
            data.content,
            campaignStatus,
            data.track_clicks ? 1 : 0,
            data.scheduled_date || null,
            sentDate,
            Date.now(),
        ]);
        if (data.categories && data.categories.length > 0) {
            for (const category of data.categories) {
                await this.dbService.run('INSERT INTO campaign_categories (campaign_id, category) VALUES (?, ?)', [result.lastID, category]);
            }
        }
        return this.findById(result.lastID);
    }
    async update(id, data) {
        const updates = [];
        const values = [];
        if (data.name) {
            updates.push('name = ?');
            values.push(data.name);
        }
        if (data.subject) {
            updates.push('subject = ?');
            values.push(data.subject);
        }
        if (data.content) {
            updates.push('content = ?');
            values.push(data.content);
        }
        if (data.status) {
            updates.push('status = ?');
            values.push(data.status);
        }
        if (data.track_clicks !== undefined) {
            updates.push('track_clicks = ?');
            values.push(data.track_clicks ? 1 : 0);
        }
        if (data.scheduled_date !== undefined) {
            updates.push('scheduled_date = ?');
            values.push(data.scheduled_date || null);
        }
        if (updates.length > 0) {
            values.push(id);
            await this.dbService.run(`UPDATE campaigns SET ${updates.join(', ')} WHERE id = ?`, values);
        }
        if (data.categories) {
            await this.dbService.run('DELETE FROM campaign_categories WHERE campaign_id = ?', [id]);
            for (const category of data.categories) {
                await this.dbService.run('INSERT INTO campaign_categories (campaign_id, category) VALUES (?, ?)', [id, category]);
            }
        }
        return this.findById(id);
    }
    async delete(id) {
        await this.dbService.run('DELETE FROM campaigns WHERE id = ?', [id]);
    }
    async getStats(id) {
        const campaign = await this.findById(id);
        if (!campaign) {
            throw new Error('Campaign not found');
        }
        let totalRecipients = 0;
        if (campaign.categories && campaign.categories.length > 0) {
            const placeholders = campaign.categories.map(() => '?').join(',');
            const recipientsResult = await this.dbService.get(`SELECT COUNT(DISTINCT s.id) as count
         FROM subscribers s
         INNER JOIN subscriber_interests si ON s.id = si.subscriber_id
         WHERE s.status = 'suscrito' AND si.category IN (${placeholders})`, campaign.categories);
            totalRecipients = recipientsResult?.count || 0;
        }
        const totalOpens = await this.dbService.get("SELECT COUNT(*) as count FROM campaign_events WHERE campaign_id = ? AND event_type = 'open'", [id]);
        const openRate = totalRecipients > 0
            ? ((totalOpens?.count || 0) / totalRecipients) * 100
            : 0;
        let totalClicks = 0;
        let clickRate = 0;
        if (campaign.track_clicks) {
            const clicks = await this.dbService.get("SELECT COUNT(*) as count FROM campaign_events WHERE campaign_id = ? AND event_type = 'click'", [id]);
            totalClicks = clicks?.count || 0;
            clickRate = totalRecipients > 0 ? (totalClicks / totalRecipients) * 100 : 0;
        }
        return {
            campaign_name: campaign.subject,
            total_recipients: totalRecipients,
            total_opens: totalOpens?.count || 0,
            open_rate: Math.round(openRate * 10) / 10,
            track_clicks: campaign.track_clicks,
            total_clicks: totalClicks,
            click_rate: Math.round(clickRate * 10) / 10,
            sent_date: campaign.sent_date || campaign.created_at,
        };
    }
    async createEvent(campaignId, subscriberId, eventType) {
        const existing = await this.dbService.get('SELECT id FROM campaign_events WHERE campaign_id = ? AND subscriber_id = ? AND event_type = ?', [campaignId, subscriberId, eventType]);
        if (existing) {
            return { inserted: false };
        }
        await this.dbService.run('INSERT INTO campaign_events (campaign_id, subscriber_id, event_type, created_at) VALUES (?, ?, ?, ?)', [campaignId, subscriberId, eventType, Date.now()]);
        return { inserted: true };
    }
};
exports.CampaignsRepository = CampaignsRepository;
exports.CampaignsRepository = CampaignsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], CampaignsRepository);
//# sourceMappingURL=campaigns.repository.js.map