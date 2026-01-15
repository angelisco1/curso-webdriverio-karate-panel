import { CampaignsRepository } from './campaigns.repository';
import { SubscribersRepository } from '../subscribers/subscribers.repository';
import { CreateCampaignDto } from './dto/create-campaign.dto';
export interface CampaignsResponse {
    status: 'ok' | 'no_subscription' | 'no_campaigns';
    campaigns: any[];
}
export declare class CampaignsService {
    private readonly campaignsRepository;
    private readonly subscribersRepository;
    constructor(campaignsRepository: CampaignsRepository, subscribersRepository: SubscribersRepository);
    findAll(user?: any): Promise<CampaignsResponse>;
    findById(id: number): Promise<import("./entities/campaign.entity").CampaignEntity>;
    create(createCampaignDto: CreateCampaignDto): Promise<import("./entities/campaign.entity").CampaignEntity>;
    update(id: number, updateData: Partial<CreateCampaignDto>): Promise<import("./entities/campaign.entity").CampaignEntity>;
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
    trackOpen(campaignId: number, subscriberId: number): Promise<{
        inserted: boolean;
    }>;
}
