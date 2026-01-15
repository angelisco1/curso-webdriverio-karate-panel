export declare class CreateCampaignDto {
    name: string;
    subject: string;
    content: string;
    categories?: string[];
    track_clicks?: boolean;
    scheduled_date?: number;
    status?: 'enviada' | 'programada' | 'borrador' | 'cancelada';
}
