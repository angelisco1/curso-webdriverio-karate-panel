import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CampaignEntity } from './entities/campaign.entity';

@Injectable()
export class CampaignsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async findAll(): Promise<CampaignEntity[]> {
    // Auto-update scheduled campaigns whose date has passed
    // Compare stored timestamp with current timestamp
    await this.dbService.run(
      `UPDATE campaigns
       SET status = 'enviada', sent_date = scheduled_date
       WHERE status = 'programada'
       AND scheduled_date IS NOT NULL
       AND scheduled_date <= ?`,
      [Date.now()],
    );

    // Fetch all campaigns
    const campaigns = await this.dbService.all<any>(
      'SELECT c.*, GROUP_CONCAT(cc.category) as categories FROM campaigns c LEFT JOIN campaign_categories cc ON c.id = cc.campaign_id GROUP BY c.id ORDER BY c.created_at DESC',
    );

    return campaigns.map((c) => ({
      ...c,
      track_clicks: Boolean(c.track_clicks),
      categories: c.categories ? c.categories.split(',') : [],
    }));
  }

  async findByCategoriesAndStatus(categories: string[]): Promise<CampaignEntity[]> {
    if (!categories || categories.length === 0) {
      return [];
    }

    // Auto-update scheduled campaigns whose date has passed
    await this.dbService.run(
      `UPDATE campaigns
       SET status = 'enviada', sent_date = scheduled_date
       WHERE status = 'programada'
       AND scheduled_date IS NOT NULL
       AND scheduled_date <= ?`,
      [Date.now()],
    );

    // Get campaigns with status 'enviada' that have at least one matching category
    const placeholders = categories.map(() => '?').join(',');
    const campaigns = await this.dbService.all<any>(
      `SELECT DISTINCT c.*, GROUP_CONCAT(cc.category) as categories
       FROM campaigns c
       INNER JOIN campaign_categories cc ON c.id = cc.campaign_id
       WHERE c.status = 'enviada' AND cc.category IN (${placeholders})
       GROUP BY c.id
       ORDER BY c.created_at DESC`,
      categories,
    );

    return campaigns.map((c) => ({
      ...c,
      track_clicks: Boolean(c.track_clicks),
      categories: c.categories ? c.categories.split(',') : [],
    }));
  }

  async findById(id: number): Promise<CampaignEntity | undefined> {
    const campaign = await this.dbService.get<any>(
      'SELECT c.*, GROUP_CONCAT(cc.category) as categories FROM campaigns c LEFT JOIN campaign_categories cc ON c.id = cc.campaign_id WHERE c.id = ? GROUP BY c.id',
      [id],
    );

    if (!campaign) return undefined;

    return {
      ...campaign,
      track_clicks: Boolean(campaign.track_clicks),
      categories: campaign.categories ? campaign.categories.split(',') : [],
    };
  }

  async create(data: {
    name: string;
    subject: string;
    content: string;
    categories?: string[];
    track_clicks?: boolean;
    scheduled_date?: number;
    status?: string;
  }): Promise<CampaignEntity> {
    const campaignStatus = data.status || 'borrador';
    const sentDate = campaignStatus === 'enviada' ? Date.now() : null;

    const result = await this.dbService.run(
      'INSERT INTO campaigns (name, subject, content, status, track_clicks, scheduled_date, sent_date, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        data.name,
        data.subject,
        data.content,
        campaignStatus,
        data.track_clicks ? 1 : 0,
        data.scheduled_date || null,
        sentDate,
        Date.now(),
      ],
    );

    if (data.categories && data.categories.length > 0) {
      for (const category of data.categories) {
        await this.dbService.run(
          'INSERT INTO campaign_categories (campaign_id, category) VALUES (?, ?)',
          [result.lastID, category],
        );
      }
    }

    return this.findById(result.lastID) as Promise<CampaignEntity>;
  }

  async update(
    id: number,
    data: Partial<Omit<CampaignEntity, 'id' | 'created_at'>>,
  ): Promise<CampaignEntity> {
    const updates: string[] = [];
    const values: any[] = [];

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
      await this.dbService.run(
        `UPDATE campaigns SET ${updates.join(', ')} WHERE id = ?`,
        values,
      );
    }

    if (data.categories) {
      await this.dbService.run(
        'DELETE FROM campaign_categories WHERE campaign_id = ?',
        [id],
      );
      for (const category of data.categories) {
        await this.dbService.run(
          'INSERT INTO campaign_categories (campaign_id, category) VALUES (?, ?)',
          [id, category],
        );
      }
    }

    return this.findById(id) as Promise<CampaignEntity>;
  }

  async delete(id: number): Promise<void> {
    await this.dbService.run('DELETE FROM campaigns WHERE id = ?', [id]);
  }

  async getStats(id: number) {
    // Obtener información de la campaña
    const campaign = await this.findById(id);
    if (!campaign) {
      throw new Error('Campaign not found');
    }

    // Total de destinatarios: contar suscriptores activos que tienen al menos una categoría de la campaña
    let totalRecipients = 0;
    if (campaign.categories && campaign.categories.length > 0) {
      const placeholders = campaign.categories.map(() => '?').join(',');
      const recipientsResult = await this.dbService.get<{ count: number }>(
        `SELECT COUNT(DISTINCT s.id) as count
         FROM subscribers s
         INNER JOIN subscriber_interests si ON s.id = si.subscriber_id
         WHERE s.status = 'suscrito' AND si.category IN (${placeholders})`,
        campaign.categories,
      );
      totalRecipients = recipientsResult?.count || 0;
    }

    // Total de aperturas (eventos 'open')
    const totalOpens = await this.dbService.get<{ count: number }>(
      "SELECT COUNT(*) as count FROM campaign_events WHERE campaign_id = ? AND event_type = 'open'",
      [id],
    );

    // Calcular tasa de apertura
    const openRate =
      totalRecipients > 0
        ? ((totalOpens?.count || 0) / totalRecipients) * 100
        : 0;

    // Total de clicks (eventos 'click' si track_clicks está habilitado)
    let totalClicks = 0;
    let clickRate = 0;

    if (campaign.track_clicks) {
      const clicks = await this.dbService.get<{ count: number }>(
        "SELECT COUNT(*) as count FROM campaign_events WHERE campaign_id = ? AND event_type = 'click'",
        [id],
      );
      totalClicks = clicks?.count || 0;
      clickRate = totalRecipients > 0 ? (totalClicks / totalRecipients) * 100 : 0;
    }

    return {
      campaign_name: campaign.subject,
      total_recipients: totalRecipients,
      total_opens: totalOpens?.count || 0,
      open_rate: Math.round(openRate * 10) / 10, // Redondear a 1 decimal
      track_clicks: campaign.track_clicks,
      total_clicks: totalClicks,
      click_rate: Math.round(clickRate * 10) / 10, // Redondear a 1 decimal
      sent_date: campaign.sent_date || campaign.created_at,
    };
  }

  async createEvent(
    campaignId: number,
    subscriberId: number,
    eventType: 'open' | 'click',
  ): Promise<{ inserted: boolean }> {
    // Check if event already exists (idempotent)
    const existing = await this.dbService.get<{ id: number }>(
      'SELECT id FROM campaign_events WHERE campaign_id = ? AND subscriber_id = ? AND event_type = ?',
      [campaignId, subscriberId, eventType],
    );

    if (existing) {
      return { inserted: false };
    }

    await this.dbService.run(
      'INSERT INTO campaign_events (campaign_id, subscriber_id, event_type, created_at) VALUES (?, ?, ?, ?)',
      [campaignId, subscriberId, eventType, Date.now()],
    );

    return { inserted: true };
  }
}
