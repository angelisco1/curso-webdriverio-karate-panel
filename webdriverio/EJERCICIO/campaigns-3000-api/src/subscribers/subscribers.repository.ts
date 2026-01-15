import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { SubscriberEntity } from './entities/subscriber.entity';
import { FilterSubscriberDto } from './dto/filter-subscriber.dto';
import * as crypto from 'crypto';

@Injectable()
export class SubscribersRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async findAll(filters?: FilterSubscriberDto): Promise<SubscriberEntity[]> {
    let query = `SELECT s.*, u.role, GROUP_CONCAT(si.category) as interests
                 FROM subscribers s
                 LEFT JOIN subscriber_interests si ON s.id = si.subscriber_id
                 LEFT JOIN users u ON s.user_id = u.id`;
    const params: any[] = [];
    const conditions: string[] = [];

    if (filters?.status) {
      conditions.push('s.status = ?');
      params.push(filters.status);
    }

    if (filters?.role) {
      conditions.push('u.role = ?');
      params.push(filters.role);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' GROUP BY s.id';

    const subscribers = await this.dbService.all<any>(query, params);
    return subscribers.map((s) => ({
      ...s,
      interests: s.interests ? s.interests.split(',') : [],
    }));
  }

  async findById(id: number): Promise<SubscriberEntity | undefined> {
    const subscriber = await this.dbService.get<any>(
      `SELECT s.*, u.role, GROUP_CONCAT(si.category) as interests
       FROM subscribers s
       LEFT JOIN subscriber_interests si ON s.id = si.subscriber_id
       LEFT JOIN users u ON s.user_id = u.id
       WHERE s.id = ?
       GROUP BY s.id`,
      [id],
    );

    if (!subscriber) return undefined;

    return {
      ...subscriber,
      interests: subscriber.interests ? subscriber.interests.split(',') : [],
    };
  }

  async findByEmail(email: string): Promise<SubscriberEntity | undefined> {
    return this.dbService.get<SubscriberEntity>(
      'SELECT * FROM subscribers WHERE email = ?',
      [email],
    )
  }

  async findByUserId(userId: number): Promise<SubscriberEntity | undefined> {
    const subscriber = await this.dbService.get<any>(
      `SELECT s.*, GROUP_CONCAT(si.category) as interests
       FROM subscribers s
       LEFT JOIN subscriber_interests si ON s.id = si.subscriber_id
       WHERE s.user_id = ?
       GROUP BY s.id`,
      [userId],
    )

    if (!subscriber) return undefined

    return {
      ...subscriber,
      interests: subscriber.interests ? subscriber.interests.split(',') : [],
    }
  }

  async create(data: {
    name: string
    email: string
    interests?: string[]
    user_id?: number
    active_until?: number
  }): Promise<SubscriberEntity> {
    const unsubscribe_token = crypto.randomBytes(32).toString('hex')

    const result = await this.dbService.run(
      'INSERT INTO subscribers (name, email, status, unsubscribe_token, user_id, active_until) VALUES (?, ?, ?, ?, ?, ?)',
      [data.name, data.email, 'suscrito', unsubscribe_token, data.user_id || null, data.active_until || null],
    )

    // Insert interests
    if (data.interests && data.interests.length > 0) {
      for (const interest of data.interests) {
        await this.dbService.run(
          'INSERT INTO subscriber_interests (subscriber_id, category) VALUES (?, ?)',
          [result.lastID, interest],
        );
      }
    }

    return this.findById(result.lastID) as Promise<SubscriberEntity>;
  }

  async update(
    id: number,
    data: Partial<Omit<SubscriberEntity, 'id' | 'created_at'>>,
  ): Promise<SubscriberEntity> {
    const updates: string[] = [];
    const values: any[] = [];

    if (data.name) {
      updates.push('name = ?');
      values.push(data.name);
    }
    if (data.email) {
      updates.push('email = ?');
      values.push(data.email);
    }
    if (data.status) {
      updates.push('status = ?')
      values.push(data.status)
    }
    if (data.active_until !== undefined) {
      updates.push('active_until = ?')
      values.push(data.active_until)
    }
    if (data.user_id !== undefined) {
      updates.push('user_id = ?')
      values.push(data.user_id)
    }

    if (updates.length > 0) {
      values.push(id)
      await this.dbService.run(
        `UPDATE subscribers SET ${updates.join(', ')} WHERE id = ?`,
        values,
      )
    }

    // Update interests if provided
    if (data.interests) {
      await this.dbService.run(
        'DELETE FROM subscriber_interests WHERE subscriber_id = ?',
        [id],
      );
      for (const interest of data.interests) {
        await this.dbService.run(
          'INSERT INTO subscriber_interests (subscriber_id, category) VALUES (?, ?)',
          [id, interest],
        );
      }
    }

    return this.findById(id) as Promise<SubscriberEntity>;
  }

  async delete(id: number): Promise<void> {
    await this.dbService.run('DELETE FROM subscribers WHERE id = ?', [id]);
  }
}
