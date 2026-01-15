import { Injectable, NotFoundException } from '@nestjs/common';
import { CampaignsRepository } from './campaigns.repository';
import { SubscribersRepository } from '../subscribers/subscribers.repository';
import { CreateCampaignDto } from './dto/create-campaign.dto';

export interface CampaignsResponse {
  status: 'ok' | 'no_subscription' | 'no_campaigns';
  campaigns: any[];
}

@Injectable()
export class CampaignsService {
  constructor(
    private readonly campaignsRepository: CampaignsRepository,
    private readonly subscribersRepository: SubscribersRepository,
  ) {}

  async findAll(user?: any): Promise<CampaignsResponse> {
    // Admin users see all campaigns
    if (!user || user.role === 'ADMIN') {
      const campaigns = await this.campaignsRepository.findAll();
      return { status: 'ok', campaigns };
    }

    // Non-admin users: check subscription status
    const subscriber = await this.subscribersRepository.findByUserId(user.id);

    if (!subscriber) {
      return { status: 'no_subscription', campaigns: [] };
    }

    // Check if subscription is active (suscrito OR in grace period)
    const isActive = subscriber.status === 'suscrito' ||
      (subscriber.status === 'baja' && subscriber.active_until && new Date(subscriber.active_until) > new Date());

    if (!isActive) {
      return { status: 'no_subscription', campaigns: [] };
    }

    // Get campaigns matching user's subscribed categories
    const categories = subscriber.interests || [];
    if (categories.length === 0) {
      return { status: 'no_campaigns', campaigns: [] };
    }

    const campaigns = await this.campaignsRepository.findByCategoriesAndStatus(categories);

    if (campaigns.length === 0) {
      return { status: 'no_campaigns', campaigns: [] };
    }

    return { status: 'ok', campaigns };
  }

  async findById(id: number) {
    const campaign = await this.campaignsRepository.findById(id);
    if (!campaign) {
      throw new NotFoundException(`Campaign #${id} not found`);
    }
    return campaign;
  }

  create(createCampaignDto: CreateCampaignDto) {
    return this.campaignsRepository.create(createCampaignDto);
  }

  async update(id: number, updateData: Partial<CreateCampaignDto>) {
    await this.findById(id);
    return this.campaignsRepository.update(id, updateData);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.campaignsRepository.delete(id);
  }

  async getStats(id: number) {
    await this.findById(id);
    return this.campaignsRepository.getStats(id);
  }

  async trackOpen(campaignId: number, subscriberId: number) {
    return this.campaignsRepository.createEvent(campaignId, subscriberId, 'open');
  }
}
