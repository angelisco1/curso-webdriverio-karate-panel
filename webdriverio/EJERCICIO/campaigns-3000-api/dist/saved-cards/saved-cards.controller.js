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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedCardsController = void 0;
const common_1 = require("@nestjs/common");
const saved_cards_service_1 = require("./saved-cards.service");
const create_saved_card_dto_1 = require("./dto/create-saved-card.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SavedCardsController = class SavedCardsController {
    savedCardsService;
    constructor(savedCardsService) {
        this.savedCardsService = savedCardsService;
    }
    findAll(req) {
        return this.savedCardsService.findByUserId(req.user.id);
    }
    create(req, createDto) {
        return this.savedCardsService.create(req.user.id, createDto);
    }
    setDefault(req, id) {
        return this.savedCardsService.setDefault(+id, req.user.id);
    }
    delete(req, id) {
        return this.savedCardsService.delete(+id, req.user.id);
    }
    getFullCard(req, id) {
        return this.savedCardsService.getFullCard(+id, req.user.id);
    }
};
exports.SavedCardsController = SavedCardsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SavedCardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_saved_card_dto_1.CreateSavedCardDto]),
    __metadata("design:returntype", void 0)
], SavedCardsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/default'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SavedCardsController.prototype, "setDefault", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SavedCardsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/full'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], SavedCardsController.prototype, "getFullCard", null);
exports.SavedCardsController = SavedCardsController = __decorate([
    (0, common_1.Controller)('api/saved-cards'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [saved_cards_service_1.SavedCardsService])
], SavedCardsController);
//# sourceMappingURL=saved-cards.controller.js.map