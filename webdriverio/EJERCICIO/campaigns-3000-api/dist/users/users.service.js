"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const bcrypt = __importStar(require("bcryptjs"));
let UsersService = class UsersService {
    usersRepository;
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async findAll() {
        const users = await this.usersRepository.findAll();
        return users.map(({ password_hash, ...user }) => user);
    }
    async findById(id) {
        const user = await this.usersRepository.findById(id);
        if (!user)
            return null;
        const { password_hash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async findByUsername(username) {
        const user = await this.usersRepository.findByUsername(username);
        return user || null;
    }
    async create(createUserDto) {
        const existingUsername = await this.usersRepository.findByUsername(createUserDto.username);
        if (existingUsername) {
            throw new common_1.ConflictException('Username already exists');
        }
        const existingEmail = await this.usersRepository.findByEmail(createUserDto.email);
        if (existingEmail) {
            throw new common_1.ConflictException('Email already exists');
        }
        const password_hash = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.usersRepository.create({
            username: createUserDto.username,
            email: createUserDto.email,
            password_hash,
        });
        const { password_hash: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async update(id, updateUserDto) {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (updateUserDto.username && updateUserDto.username !== user.username) {
            const existingUsername = await this.usersRepository.findByUsername(updateUserDto.username);
            if (existingUsername) {
                throw new common_1.ConflictException('Username already exists');
            }
        }
        const updatedUser = await this.usersRepository.update(id, {
            username: updateUserDto.username,
        });
        const { password_hash, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
    async changePassword(id, changePasswordDto) {
        const user = await this.usersRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await bcrypt.compare(changePasswordDto.currentPassword, user.password_hash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const newPasswordHash = await bcrypt.hash(changePasswordDto.newPassword, 10);
        await this.usersRepository.update(id, { password_hash: newPasswordHash });
    }
    async validateUser(username, password) {
        const user = await this.usersRepository.findByUsername(username);
        if (!user)
            return null;
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid)
            return null;
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=users.service.js.map