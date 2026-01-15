import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    password_hash: 'hashedpassword',
    role: 'USER' as const,
    created_at: '2024-01-01T00:00:00.000Z',
  };

  const mockUserWithoutPassword = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com',
    role: 'USER' as const,
    created_at: '2024-01-01T00:00:00.000Z',
  };

  const mockUsersService = {
    validateUser: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return user and token on successful login', async () => {
      const loginDto = {
        username: 'testuser',
        password: 'password123',
      };

      mockUsersService.validateUser.mockResolvedValue(mockUser);
      mockJwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await service.login(loginDto);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user).not.toHaveProperty('password_hash');
      expect(result.token).toBe('mock-jwt-token');
      expect(mockUsersService.validateUser).toHaveBeenCalledWith(
        loginDto.username,
        loginDto.password,
      );
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      const loginDto = {
        username: 'testuser',
        password: 'wrongpassword',
      };

      mockUsersService.validateUser.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    it('should create user and return token', async () => {
      const registerDto = {
        username: 'newuser',
        email: 'new@example.com',
        password: 'password123',
      };

      mockUsersService.create.mockResolvedValue(mockUserWithoutPassword);
      mockJwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await service.register(registerDto);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.token).toBe('mock-jwt-token');
      expect(mockUsersService.create).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('validateToken', () => {
    it('should return user for valid token payload', async () => {
      mockUsersService.findById.mockResolvedValue(mockUserWithoutPassword);

      const result = await service.validateToken(1);

      expect(result).toEqual(mockUserWithoutPassword);
      expect(mockUsersService.findById).toHaveBeenCalledWith(1);
    });

    it('should return null for invalid user id', async () => {
      mockUsersService.findById.mockResolvedValue(null);

      const result = await service.validateToken(999);

      expect(result).toBeNull();
    });
  });
});
