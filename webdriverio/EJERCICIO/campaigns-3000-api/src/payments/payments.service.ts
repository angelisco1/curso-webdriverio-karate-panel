import { Injectable, BadRequestException } from '@nestjs/common'
import { PaymentsRepository } from './payments.repository'
import { ProcessPaymentDto } from './dto/process-payment.dto'

// Test card numbers for payment simulation
const ERROR_CARDS: Record<string, { code: string; message: string }> = {
  '4000000000000002': { code: 'card_declined', message: 'La tarjeta ha sido rechazada' },
  '4000000000000051': { code: 'insufficient_funds', message: 'Fondos insuficientes' },
  '4000000000000069': { code: 'expired_card', message: 'La tarjeta ha expirado' },
  '4000000000000119': { code: 'processing_error', message: 'Error de procesamiento' },
}

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async processPayment(processPaymentDto: ProcessPaymentDto) {
    const { card_number, amount, subscriber_id } = processPaymentDto

    // Check for test error cards
    const errorCard = ERROR_CARDS[card_number]
    if (errorCard) {
      // Save failed payment record
      await this.paymentsRepository.create({
        subscriber_id,
        card_number,
        amount,
        status: 'failed',
        error_message: errorCard.message,
      })

      // Throw exception to trigger rollback in subscriber service
      throw new BadRequestException({
        message: errorCard.message,
        errorCode: errorCard.code,
      })
    }

    // Successful payment (4242424242424242 and other valid cards)
    const payment = await this.paymentsRepository.create({
      subscriber_id,
      card_number,
      amount,
      status: 'success',
    })

    return payment
  }

  findAll() {
    return this.paymentsRepository.findAll()
  }

  findBySubscriberId(subscriberId: number) {
    return this.paymentsRepository.findBySubscriberId(subscriberId)
  }

  async getLastCardBySubscriberId(subscriberId: number): Promise<{ last4: string } | null> {
    const payment = await this.paymentsRepository.findLastSuccessfulBySubscriberId(subscriberId)
    if (!payment) return null
    // Return only last 4 digits
    const last4 = payment.card_number.slice(-4)
    return { last4 }
  }
}
