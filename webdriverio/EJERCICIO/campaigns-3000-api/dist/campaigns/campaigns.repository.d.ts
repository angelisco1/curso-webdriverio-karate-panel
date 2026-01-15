import { DatabaseService } from '../database/database.service';
import { CampaignEntity } from './entities/campaign.entity';
export declare class CampaignsRepository {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    findAll(): Promise<CampaignEntity[]>;
    findByCategoriesAndStatus(categories: string[]): Promise<CampaignEntity[]>;
    findById(id: number): Promise<CampaignEntity | undefined>;
    create(data: {
        name: string;
        subject: string;
        content: string;
        categories?: string[];
        track_clicks?: boolean;
        scheduled_date?: number;
        status?: string;
    }): Promise<CampaignEntity>;
    update(id: number, data: Partial<Omit<CampaignEntity, 'id' | 'created_at'>>): Promise<CampaignEntity>;
    delete(id: number): Promise<void>;
    getStats(id: number): Promise<{
        campaign_name: string;
        total_recipients: number;
        total_opens: number;
        open_rate: number;
        track_clicks: boolean;
        total_clicks: number;
        click_rate: number;
        sent_date: number;
    }>;
    createEvent(campaignId: number, subscriberId: number, eventType: 'open' | 'click'): Promise<{
        inserted: boolean;
    }>;
}
