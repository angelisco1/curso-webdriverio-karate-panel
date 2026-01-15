import { Injectable } from '@nestjs/common'
import { DatabaseService } from '../database/database.service'
import { SavedCardEntity } from './entities/saved-card.entity'

@Injectable()
export class SavedCardsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async onModuleInit() {
    // Create table if not exists
    await this.dbService.run(`
      CREATE TABLE IF NOT EXISTS saved_cards (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        card_number TEXT NOT NULL,
        expiry TEXT NOT NULL,
        cvv TEXT NOT NULL,
        is_default INTEGER DEFAULT 0,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `)
  }

  async findByUserId(userId: number): Promise<SavedCardEntity[]> {
    return this.dbService.all<SavedCardEntity>(
      'SELECT * FROM saved_cards WHERE user_id = ? ORDER BY is_default DESC, created_at DESC',
      [userId]
    )
  }

  async findById(id: number): Promise<SavedCardEntity | undefined> {
    return this.dbService.get<SavedCardEntity>(
      'SELECT * FROM saved_cards WHERE id = ?',
      [id]
    )
  }

  async create(data: {
    user_id: number
    card_number: string
    expiry: string
    cvv: string
    is_default?: boolean
  }): Promise<SavedCardEntity> {
    const createdAt = Date.now()
    const result = await this.dbService.run(
      'INSERT INTO saved_cards (user_id, card_number, expiry, cvv, is_default, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [data.user_id, data.card_number, data.expiry, data.cvv, data.is_default ? 1 : 0, createdAt]
    )

    return {
      id: result.lastID,
      user_id: data.user_id,
      card_number: data.card_number,
      expiry: data.expiry,
      cvv: data.cvv,
      is_default: data.is_default || false,
      created_at: createdAt
    }
  }

  async setDefault(id: number, userId: number): Promise<void> {
    // First, unset all defaults for this user
    await this.dbService.run('UPDATE saved_cards SET is_default = 0 WHERE user_id = ?', [userId])
    // Then set the specified card as default
    await this.dbService.run('UPDATE saved_cards SET is_default = 1 WHERE id = ?', [id])
  }

  async delete(id: number): Promise<void> {
    await this.dbService.run('DELETE FROM saved_cards WHERE id = ?', [id])
  }
}
