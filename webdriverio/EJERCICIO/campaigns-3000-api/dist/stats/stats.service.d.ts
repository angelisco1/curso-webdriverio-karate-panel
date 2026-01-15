import { DatabaseService } from '../database/database.service';
import { CampaignsRepository } from '../campaigns/campaigns.repository';
export declare class StatsService {
    private readonly dbService;
    private readonly campaignsRepository;
    constructor(dbService: DatabaseService, campaignsRepository: CampaignsRepository);
    getDashboardStats(): Promise<{
        active_subscribers: number;
        total_campaigns: number;
        sent_campaigns: number;
        average_open_rate: number;
    }>;
    getSubscriberStats(): Promise<{
        total: number;
        by_status: {
            status: string;
            count: number;
        }[];
    }>;
}
