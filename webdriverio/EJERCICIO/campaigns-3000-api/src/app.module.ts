import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { PaymentsModule } from './payments/payments.module';
import { StatsModule } from './stats/stats.module';
import { SavedCardsModule } from './saved-cards/saved-cards.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    SubscribersModule,
    CampaignsModule,
    PaymentsModule,
    StatsModule,
    SavedCardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
