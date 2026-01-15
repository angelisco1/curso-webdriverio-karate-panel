import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PaymentEntity } from './entities/payment.entity';

@Injectable()
export class PaymentsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async create(data: {
    subscriber_id: number;
    card_number: string;
    amount: number;
    status: string;
    error_message?: string;
  }): Promise<PaymentEntity> {
    const createdAt = Date.now();
    const result = await this.dbService.run(
      'INSERT INTO payments (subscriber_id, card_number, amount, status, error_message, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [
        data.subscriber_id,
        data.card_number,
        data.amount,
        data.status,
        data.error_message || null,
        createdAt,
      ],
    );

    return {
      id: result.lastID,
      ...data,
      created_at: createdAt,
    } as PaymentEntity;
  }

  async findAll(): Promise<PaymentEntity[]> {
    return this.dbService.all<PaymentEntity>('SELECT * FROM payments');
  }

  async findBySubscriberId(subscriberId: number): Promise<PaymentEntity[]> {
    return this.dbService.all<PaymentEntity>(
      'SELECT * FROM payments WHERE subscriber_id = ?',
      [subscriberId],
    );
  }

  async findLastSuccessfulBySubscriberId(subscriberId: number): Promise<PaymentEntity | undefined> {
    return this.dbService.get<PaymentEntity>(
      'SELECT * FROM payments WHERE subscriber_id = ? AND status = ? ORDER BY created_at DESC LIMIT 1',
      [subscriberId, 'success'],
    );
  }
}
