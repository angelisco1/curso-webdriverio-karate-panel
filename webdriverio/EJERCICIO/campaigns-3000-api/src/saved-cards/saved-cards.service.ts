import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common'
import { SavedCardsRepository } from './saved-cards.repository'
import { CreateSavedCardDto } from './dto/create-saved-card.dto'

@Injectable()
export class SavedCardsService {
  constructor(private readonly savedCardsRepository: SavedCardsRepository) {}

  async findByUserId(userId: number) {
    const cards = await this.savedCardsRepository.findByUserId(userId)
    // Return cards with masked number (only last 4 visible) but keep full data for internal use
    return cards.map(card => ({
      ...card,
      card_last4: card.card_number.slice(-4),
      is_default: !!card.is_default
    }))
  }

  async create(userId: number, createDto: CreateSavedCardDto) {
    // If this is the first card or marked as default, set it as default
    const existingCards = await this.savedCardsRepository.findByUserId(userId)
    const isDefault = existingCards.length === 0 || createDto.is_default

    const card = await this.savedCardsRepository.create({
      user_id: userId,
      card_number: createDto.card_number.replace(/\s/g, ''), // Remove spaces
      expiry: createDto.expiry,
      cvv: createDto.cvv,
      is_default: isDefault
    })

    // If marked as default, update other cards
    if (isDefault && existingCards.length > 0) {
      await this.savedCardsRepository.setDefault(card.id, userId)
    }

    return {
      ...card,
      card_last4: card.card_number.slice(-4),
      is_default: !!card.is_default
    }
  }

  async setDefault(id: number, userId: number) {
    const card = await this.savedCardsRepository.findById(id)
    if (!card) {
      throw new NotFoundException('Card not found')
    }
    if (card.user_id !== userId) {
      throw new ForbiddenException('Not authorized')
    }

    await this.savedCardsRepository.setDefault(id, userId)
    return { success: true }
  }

  async delete(id: number, userId: number) {
    const card = await this.savedCardsRepository.findById(id)
    if (!card) {
      throw new NotFoundException('Card not found')
    }
    if (card.user_id !== userId) {
      throw new ForbiddenException('Not authorized')
    }

    await this.savedCardsRepository.delete(id)

    // If we deleted the default card, make another one default
    if (card.is_default) {
      const remainingCards = await this.savedCardsRepository.findByUserId(userId)
      if (remainingCards.length > 0) {
        await this.savedCardsRepository.setDefault(remainingCards[0].id, userId)
      }
    }

    return { success: true }
  }

  async getFullCard(id: number, userId: number) {
    const card = await this.savedCardsRepository.findById(id)
    if (!card) {
      throw new NotFoundException('Card not found')
    }
    if (card.user_id !== userId) {
      throw new ForbiddenException('Not authorized')
    }
    return card
  }
}
