import { Module, OnModuleInit } from '@nestjs/common'
import { SavedCardsController } from './saved-cards.controller'
import { SavedCardsService } from './saved-cards.service'
import { SavedCardsRepository } from './saved-cards.repository'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [SavedCardsController],
  providers: [SavedCardsService, SavedCardsRepository],
  exports: [SavedCardsService]
})
export class SavedCardsModule implements OnModuleInit {
  constructor(private readonly savedCardsRepository: SavedCardsRepository) {}

  async onModuleInit() {
    await this.savedCardsRepository.onModuleInit()
  }
}
