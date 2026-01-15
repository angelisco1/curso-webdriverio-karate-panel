import { Module } from '@nestjs/common';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';
import { CampaignsRepository } from './campaigns.repository';
import { SubscribersRepository } from '../subscribers/subscribers.repository';

@Module({
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignsRepository, SubscribersRepository],
  exports: [CampaignsService, CampaignsRepository],
})
export class CampaignsModule {}
