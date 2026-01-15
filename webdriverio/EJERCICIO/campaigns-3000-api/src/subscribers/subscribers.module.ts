import { Module } from '@nestjs/common';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './subscribers.service';
import { SubscribersRepository } from './subscribers.repository';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [PaymentsModule],
  controllers: [SubscribersController],
  providers: [SubscribersService, SubscribersRepository],
  exports: [SubscribersService],
})
export class SubscribersModule {}
