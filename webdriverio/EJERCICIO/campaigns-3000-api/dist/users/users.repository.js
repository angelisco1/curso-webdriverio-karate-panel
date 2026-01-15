"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let UsersRepository = class UsersRepository {
    dbService;
    constructor(dbService) {
        this.dbService = dbService;
    }
    async findAll() {
        return this.dbService.all('SELECT * FROM users');
    }
    async findById(id) {
        return this.dbService.get('SELECT * FROM users WHERE id = ?', [id]);
    }
    async findByUsername(username) {
        return this.dbService.get('SELECT * FROM users WHERE username = ?', [username]);
    }
    async findByEmail(email) {
        return this.dbService.get('SELECT * FROM users WHERE email = ?', [email]);
    }
    async create(data) {
        const result = await this.dbService.run('INSERT INTO users (username, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)', [data.username, data.email, data.password_hash, data.role || 'USER', Date.now()]);
        return this.findById(result.lastID);
    }
    async update(id, data) {
        const updates = [];
        const values = [];
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
        return this.findById(id);
    }
    async delete(id) {
        await this.dbService.run('DELETE FROM users WHERE id = ?', [id]);
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UsersRepository);
//# sourceMappingURL=users.repository.js.map