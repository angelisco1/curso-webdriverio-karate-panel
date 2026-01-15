export class CampaignEntity {
  id: number;
  name: string;
  subject: string;
  content: string;
  status: 'enviada' | 'programada' | 'borrador' | 'cancelada';
  track_clicks: boolean;
  scheduled_date?: number;
  sent_date?: number;
  open_rate: number;
  created_at: number;
  categories?: string[];
}
