import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<Omit<UserEntity, 'password_hash'>[]> {
    const users = await this.usersRepository.findAll();
    return users.map(({ password_hash, ...user }) => user);
  }

  async findById(id: number): Promise<Omit<UserEntity, 'password_hash'> | null> {
    const user = await this.usersRepository.findById(id);
    if (!user) return null;
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.findByUsername(username);
    return user || null;
  }

  async create(createUserDto: CreateUserDto): Promise<Omit<UserEntity, 'password_hash'>> {
    // Check if username already exists
    const existingUsername = await this.usersRepository.findByUsername(createUserDto.username);
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    // Check if email already exists
    const existingEmail = await this.usersRepository.findByEmail(createUserDto.email);
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const password_hash = await bcrypt.hash(createUserDto.password, 10);

    // Create user
    const user = await this.usersRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password_hash,
    });

    const { password_hash: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Omit<UserEntity, 'password_hash'>> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if new username already exists (if changing)
    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existingUsername = await this.usersRepository.findByUsername(updateUserDto.username);
      if (existingUsername) {
        throw new ConflictException('Username already exists');
      }
    }

    const updatedUser = await this.usersRepository.update(id, {
      username: updateUserDto.username,
    });

    const { password_hash, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(changePasswordDto.currentPassword, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    // Hash new password and update
    const newPasswordHash = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.usersRepository.update(id, { password_hash: newPasswordHash });
  }

  async validateUser(username: string, password: string): Promise<UserEntity | null> {
    const user = await this.usersRepository.findByUsername(username);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) return null;

    return user;
  }
}
