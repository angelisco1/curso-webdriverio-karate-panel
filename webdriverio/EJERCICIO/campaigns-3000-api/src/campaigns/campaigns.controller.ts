import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/campaigns')
@UseGuards(JwtAuthGuard)
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.campaignsService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignsService.findById(+id);
  }

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateCampaignDto>,
  ) {
    return this.campaignsService.update(+id, updateData);
  }

  @Get(':id/stats')
  getStats(@Param('id') id: string) {
    return this.campaignsService.getStats(+id);
  }

  @Post(':id/track-open')
  trackOpen(@Param('id') id: string, @Body() body: { subscriber_id: number }) {
    return this.campaignsService.trackOpen(+id, body.subscriber_id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.campaignsService.delete(+id);
  }
}
