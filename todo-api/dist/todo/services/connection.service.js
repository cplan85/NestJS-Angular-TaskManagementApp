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
exports.ConnectionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const connection_entity_1 = require("../entities/connection.entity");
const typeorm_2 = require("typeorm");
let ConnectionService = class ConnectionService {
    constructor(connectionRepo) {
        this.connectionRepo = connectionRepo;
    }
    async create(connection) {
        return this.connectionRepo.save(connection);
    }
    async findByUserId(userId) {
        return this.connectionRepo.find({
            where: {
                connectedUser: {
                    id: userId
                }
            }
        });
    }
    async findAll() {
        return this.connectionRepo.find();
    }
    async deleteBySocketId(socketId) {
        return this.connectionRepo.delete({ socketId });
    }
    async deleteAll() {
        await this.connectionRepo.createQueryBuilder().delete().execute();
    }
};
exports.ConnectionService = ConnectionService;
exports.ConnectionService = ConnectionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(connection_entity_1.Connection)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ConnectionService);
//# sourceMappingURL=connection.service.js.map