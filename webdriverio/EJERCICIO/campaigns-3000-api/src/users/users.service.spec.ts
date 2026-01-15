import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockUserEntity = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password_hash: 'hashedpassword',
    role: 'USER' as const,
    created_at: '2024-01-01T00:00:00.000Z',
  };

  const mockUsersRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByUsername: jest.fn(),
    findByEmail: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of users without password_hash', async () => {
      mockUsersRepository.findAll.mockResolvedValue([mockUserEntity]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0]).not.toHaveProperty('password_hash');
      expect(result[0].username).toBe('testuser');
    });
  });

  describe('findById', () => {
    it('should return user without password_hash', async () => {
      mockUsersRepository.findById.mockResolvedValue(mockUserEntity);

      const result = await service.findById(1);

      expect(result).toBeDefined();
      expect(result).not.toHaveProperty('password_hash');
      expect(result?.username).toBe('testuser');
    });

    it('should return null if user not found', async () => {
      mockUsersRepository.findById.mockResolvedValue(undefined);

      const result = await service.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const createUserDto = {
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
      };

      mockUsersRepository.findByUsername.mockResolvedValue(null);
      mockUsersRepository.findByEmail.mockResolvedValue(null);
      mockUsersRepository.create.mockResolvedValue(mockUserEntity);

      const result = await service.create(createUserDto);

      expect(result).toBeDefined();
      expect(result).not.toHaveProperty('password_hash');
      expect(mockUsersRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          username: createUserDto.username,
          email: createUserDto.email,
          password_hash: expect.any(String),
        })
      );
    });

    it('should throw ConflictException if username exists', async () => {
      const createUserDto = {
        username: 'existinguser',
        email: 'new@example.com',
        password: 'password123',
      };

      mockUsersRepository.findByUsername.mockResolvedValue(mockUserEntity);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if email exists', async () => {
      const createUserDto = {
        username: 'newuser',
        email: 'existing@example.com',
        password: 'password123',
      };

      mockUsersRepository.findByUsername.mockResolvedValue(null);
      mockUsersRepository.findByEmail.mockResolvedValue(mockUserEntity);

      await expect(service.create(createUserDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const userWithHashedPassword = {
        ...mockUserEntity,
        password_hash: hashedPassword,
      };

      mockUsersRepository.findByUsername.mockResolvedValue(
        userWithHashedPassword,
      );

      const result = await service.validateUser('testuser', 'password123');

      expect(result).toBeDefined();
      expect(result?.username).toBe('testuser');
    });

    it('should return null if user not found', async () => {
      mockUsersRepository.findByUsername.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent', 'password123');

      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      const hashedPassword = await bcrypt.hash('correctpassword', 10);
      const userWithHashedPassword = {
        ...mockUserEntity,
        password_hash: hashedPassword,
      };

      mockUsersRepository.findByUsername.mockResolvedValue(
        userWithHashedPassword,
      );

      const result = await service.validateUser('testuser', 'wrongpassword');

      expect(result).toBeNull();
    });
  });
});
