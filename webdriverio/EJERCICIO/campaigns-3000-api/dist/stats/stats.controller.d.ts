import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
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
