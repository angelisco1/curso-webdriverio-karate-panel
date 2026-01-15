import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { FilterSubscriberDto } from './dto/filter-subscriber.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() filters: FilterSubscriberDto) {
    return this.subscribersService.findAll(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribersService.findById(+id);
  }

  @Post()
  create(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.subscribersService.create(createSubscriberDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  replace(
    @Param('id') id: string,
    @Body() updateData: CreateSubscriberDto,
  ) {
    return this.subscribersService.update(+id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<CreateSubscriberDto>,
  ) {
    return this.subscribersService.update(+id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.subscribersService.findByUserId(+userId)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.subscribersService.cancel(+id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.subscribersService.delete(+id)
  }
}
