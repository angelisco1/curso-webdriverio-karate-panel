import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common'
import { SubscribersRepository } from './subscribers.repository'
import { CreateSubscriberDto } from './dto/create-subscriber.dto'
import { FilterSubscriberDto } from './dto/filter-subscriber.dto'
import { PaymentsService } from '../payments/payments.service'

@Injectable()
export class SubscribersService {
  constructor(
    private readonly subscribersRepository: SubscribersRepository,
    private readonly paymentsService: PaymentsService,
  ) {}

  /**
   * Calculate subscription price based on number of categories
   * - 1 category: 4.99€
   * - 2-4 categories: 4.99€ + 2€ per additional category
   * - 5+ categories: 4.99€ + 6€ (3x2€) + 1€ per extra category
   */
  private calculatePrice(categoryCount: number): number {
    if (categoryCount === 0) return 0
    if (categoryCount === 1) return 4.99
    if (categoryCount <= 4) {
      return 4.99 + (categoryCount - 1) * 2
    }
    // 5+ categories
    return 4.99 + 6 + (categoryCount - 4) * 1
  }

  async findAll(filters?: FilterSubscriberDto) {
    return this.subscribersRepository.findAll(filters)
  }

  async findById(id: number) {
    const subscriber = await this.subscribersRepository.findById(id)
    if (!subscriber) {
      throw new NotFoundException(`Subscriber #${id} not found`)
    }
    return subscriber
  }

  async findByUserId(userId: number) {
    return this.subscribersRepository.findByUserId(userId)
  }

  async create(createSubscriberDto: CreateSubscriberDto) {
    const existing = await this.subscribersRepository.findByEmail(
      createSubscriberDto.email,
    )

    // Calculate price based on interests (secure server-side calculation)
    const categoryCount = createSubscriberDto.interests?.length || 0
    const amount = this.calculatePrice(categoryCount)

    if (existing) {
      // Check subscription status
      if (existing.status === 'suscrito') {
        throw new ConflictException('Email already has an active subscription')
      }

      // Check if in grace period (status='baja' but active_until > now)
      if (existing.status === 'baja' && existing.active_until) {
        const activeUntil = new Date(existing.active_until)  // Works with number timestamp
        const now = new Date()
        if (activeUntil > now) {
          const formattedDate = activeUntil.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
          throw new BadRequestException(
            `Tu suscripción sigue activa hasta el ${formattedDate}. No puedes crear una nueva suscripción hasta que expire.`
          )
        }
      }

      // Status='baja' and active_until <= now (or null): Create new subscription
      // Update existing record with new data
      const originalActiveUntil = existing.active_until  // Guardar valor original para rollback
      const activeUntil = new Date()
      activeUntil.setDate(activeUntil.getDate() + 30)

      const subscriber = await this.subscribersRepository.update(existing.id, {
        name: createSubscriberDto.name,
        status: 'suscrito',
        interests: createSubscriberDto.interests,
        user_id: createSubscriberDto.user_id,
        active_until: activeUntil.getTime(),
      })

      // Process payment for new subscription (using calculated amount)
      if (createSubscriberDto.cardNumber && amount > 0) {
        try {
          await this.paymentsService.processPayment({
            subscriber_id: subscriber.id,
            card_number: createSubscriberDto.cardNumber,
            amount: amount,
          })
        } catch (error) {
          // Revert to original state if payment fails
          await this.subscribersRepository.update(existing.id, {
            status: 'baja',
            active_until: originalActiveUntil
          })
          throw error
        }
      }

      return subscriber
    }

    // Email doesn't exist: Create new subscriber
    const activeUntil = new Date()
    activeUntil.setDate(activeUntil.getDate() + 30)

    const subscriber = await this.subscribersRepository.create({
      ...createSubscriberDto,
      active_until: activeUntil.getTime(),
    })

    // Process Payment (using calculated amount)
    if (createSubscriberDto.cardNumber && amount > 0) {
      try {
        await this.paymentsService.processPayment({
          subscriber_id: subscriber.id,
          card_number: createSubscriberDto.cardNumber,
          amount: amount,
        })
      } catch (error) {
        // Compensation: Delete subscriber if payment fails
        await this.subscribersRepository.delete(subscriber.id)
        throw error
      }
    }

    return subscriber
  }

  async update(id: number, updateData: Partial<CreateSubscriberDto>) {
    await this.findById(id) // Check if exists
    return this.subscribersRepository.update(id, updateData)
  }

  async cancel(id: number) {
    const subscriber = await this.findById(id)

    if (subscriber.status === 'baja') {
      throw new BadRequestException('Subscription is already cancelled')
    }

    // Only change status to 'baja', do NOT modify active_until
    return this.subscribersRepository.update(id, { status: 'baja' })
  }

  async delete(id: number) {
    await this.findById(id) // Check if exists
    return this.subscribersRepository.delete(id)
  }
}
