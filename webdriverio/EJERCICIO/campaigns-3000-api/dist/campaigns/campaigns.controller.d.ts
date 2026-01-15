import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
export declare class CampaignsController {
    private readonly campaignsService;
    constructor(campaignsService: CampaignsService);
    findAll(req: any): Promise<import("./campaigns.service").CampaignsResponse>;
    findOne(id: string): Promise<import("./entities/campaign.entity").CampaignEntity>;
    create(createCampaignDto: CreateCampaignDto): Promise<import("./entities/campaign.entity").CampaignEntity>;
    update(id: string, updateData: Partial<CreateCampaignDto>): Promise<import("./entities/campaign.entity").CampaignEntity>;
    getStats(id: string): Promise<{
        campaign_name: string;
        total_recipients: number;
        total_opens: number;
        open_rate: number;
        track_clicks: boolean;
        total_clicks: number;
        click_rate: number;
        sent_date: number;
    }>;
    trackOpen(id: string, body: {
        subscriber_id: number;
    }): Promise<{
        inserted: boolean;
    }>;
    delete(id: string): Promise<void>;
}
