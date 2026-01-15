import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CampaignsRepository } from '../campaigns/campaigns.repository';

@Injectable()
export class StatsService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly campaignsRepository: CampaignsRepository,
  ) {}

  async getDashboardStats() {
    const activeSubscribers = await this.dbService.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM subscribers WHERE status = 'suscrito'",
    );

    // Calcular estadísticas de campañas directamente
    const totalCampaigns = await this.dbService.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM campaigns',
    );

    const sentCampaigns = await this.dbService.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM campaigns WHERE status = 'enviada'",
    );

    const avgOpenRate = await this.dbService.get<{ avg: number }>(
      "SELECT AVG(open_rate) as avg FROM campaigns WHERE status = 'enviada'",
    );

    return {
      active_subscribers: activeSubscribers?.count || 0,
      total_campaigns: totalCampaigns?.count || 0,
      sent_campaigns: sentCampaigns?.count || 0,
      average_open_rate: avgOpenRate?.avg || 0,
    };
  }

  async getSubscriberStats() {
    const total = await this.dbService.get<{ count: number }>(
      'SELECT COUNT(*) as count FROM subscribers',
    );

    const byStatus = await this.dbService.all<{ status: string; count: number }>(
      'SELECT status, COUNT(*) as count FROM subscribers GROUP BY status',
    );

    return {
      total: total?.count || 0,
      by_status: byStatus,
    };
  }
}
