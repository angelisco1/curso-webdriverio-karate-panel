import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async findAll(): Promise<UserEntity[]> {
    return this.dbService.all<UserEntity>('SELECT * FROM users');
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return this.dbService.get<UserEntity>('SELECT * FROM users WHERE id = ?', [id]);
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.dbService.get<UserEntity>('SELECT * FROM users WHERE username = ?', [username]);
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.dbService.get<UserEntity>('SELECT * FROM users WHERE email = ?', [email]);
  }

  async create(data: { username: string; email: string; password_hash: string; role?: string }): Promise<UserEntity> {
    const result = await this.dbService.run(
      'INSERT INTO users (username, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)',
      [data.username, data.email, data.password_hash, data.role || 'USER', Date.now()],
    );

    return this.findById(result.lastID) as Promise<UserEntity>;
  }

  async update(id: number, data: Partial<Omit<UserEntity, 'id' | 'created_at'>>): Promise<UserEntity> {
    const updates: string[] = [];
    const values: any[] = [];

    if (data.username) {
      updates.push('username = ?');
      values.push(data.username);
    }
    if (data.email) {
      updates.push('email = ?');
      values.push(data.email);
    }
    if (data.password_hash) {
      updates.push('password_hash = ?');
      values.push(data.password_hash);
    }
    if (data.role) {
      updates.push('role = ?');
      values.push(data.role);
    }

    values.push(id);

    await this.dbService.run(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);

    return this.findById(id) as Promise<UserEntity>;
  }

  async delete(id: number): Promise<void> {
    await this.dbService.run('DELETE FROM users WHERE id = ?', [id]);
  }
}
