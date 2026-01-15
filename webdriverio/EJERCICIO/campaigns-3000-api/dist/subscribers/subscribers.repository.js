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
exports.SubscribersRepository = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const crypto = __importStar(require("crypto"));
let SubscribersRepository = class SubscribersRepository {
    dbService;
    constructor(dbService) {
        this.dbService = dbService;
    }
    async findAll(filters) {
        let query = `SELECT s.*, u.role, GROUP_CONCAT(si.category) as interests
                 FROM subscribers s
                 LEFT JOIN subscriber_interests si ON s.id = si.subscriber_id
                 LEFT JOIN users u ON s.user_id = u.id`;
        const params = [];
        const conditions = [];
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
        const subscribers = await this.dbService.all(query, params);
        return subscribers.map((s) => ({
            ...s,
            interests: s.interests ? s.interests.split(',') : [],
        }));
    }
    async findById(id) {
        const subscriber = await this.dbService.get(`SELECT s.*, u.role, GROUP_CONCAT(si.category) as interests
       FROM subscribers s
       LEFT JOIN subscriber_interests si ON s.id = si.subscriber_id
       LEFT JOIN users u ON s.user_id = u.id
       WHERE s.id = ?
       GROUP BY s.id`, [id]);
        if (!subscriber)
            return undefined;
        return {
            ...subscriber,
            interests: subscriber.interests ? subscriber.interests.split(',') : [],
        };
    }
    async findByEmail(email) {
        return this.dbService.get('SELECT * FROM subscribers WHERE email = ?', [email]);
    }
    async findByUserId(userId) {
        const subscriber = await this.dbService.get(`SELECT s.*, GROUP_CONCAT(si.category) as interests
       FROM subscribers s
       LEFT JOIN subscriber_interests si ON s.id = si.subscriber_id
       WHERE s.user_id = ?
       GROUP BY s.id`, [userId]);
        if (!subscriber)
            return undefined;
        return {
            ...subscriber,
            interests: subscriber.interests ? subscriber.interests.split(',') : [],
        };
    }
    async create(data) {
        const unsubscribe_token = crypto.randomBytes(32).toString('hex');
        const result = await this.dbService.run('INSERT INTO subscribers (name, email, status, unsubscribe_token, user_id, active_until) VALUES (?, ?, ?, ?, ?, ?)', [data.name, data.email, 'suscrito', unsubscribe_token, data.user_id || null, data.active_until || null]);
        if (data.interests && data.interests.length > 0) {
            for (const interest of data.interests) {
                await this.dbService.run('INSERT INTO subscriber_interests (subscriber_id, category) VALUES (?, ?)', [result.lastID, interest]);
            }
        }
        return this.findById(result.lastID);
    }
    async update(id, data) {
        const updates = [];
        const values = [];
        if (data.name) {
            updates.push('name = ?');
            values.push(data.name);
        }
        if (data.email) {
            updates.push('email = ?');
            values.push(data.email);
        }
        if (data.status) {
            updates.push('status = ?');
            values.push(data.status);
        }
        if (data.active_until !== undefined) {
            updates.push('active_until = ?');
            values.push(data.active_until);
        }
        if (data.user_id !== undefined) {
            updates.push('user_id = ?');
            values.push(data.user_id);
        }
        if (updates.length > 0) {
            values.push(id);
            await this.dbService.run(`UPDATE subscribers SET ${updates.join(', ')} WHERE id = ?`, values);
        }
        if (data.interests) {
            await this.dbService.run('DELETE FROM subscriber_interests WHERE subscriber_id = ?', [id]);
            for (const interest of data.interests) {
                await this.dbService.run('INSERT INTO subscriber_interests (subscriber_id, category) VALUES (?, ?)', [id, interest]);
            }
        }
        return this.findById(id);
    }
    async delete(id) {
        await this.dbService.run('DELETE FROM subscribers WHERE id = ?', [id]);
    }
};
exports.SubscribersRepository = SubscribersRepository;
exports.SubscribersRepository = SubscribersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], SubscribersRepository);
//# sourceMappingURL=subscribers.repository.js.map