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
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const todo_entity_1 = require("../entities/todo.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let TodoService = class TodoService {
    constructor(todoRepository) {
        this.todoRepository = todoRepository;
    }
    findAll() {
        return this.todoRepository.find();
    }
    saveAll(todoItems) {
        return this.todoRepository.save(todoItems);
    }
    save(todoItem) {
        return this.todoRepository.save(todoItem);
    }
    async updateMultiple(todoItems) {
        const updatePromises = todoItems.map(async (todoItem) => {
            await this.todoRepository.update(todoItem.id, todoItem);
            return this.todoRepository.findOne({
                where: {
                    id: todoItem.id
                }
            });
        });
        const updatedItems = await Promise.all(updatePromises);
        return updatedItems;
    }
    async update(todoItem) {
        await this.todoRepository.update(todoItem.id, todoItem);
        const updatedItem = await this.todoRepository.findOne({
            where: {
                id: todoItem.id
            }
        });
        return updatedItem;
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(todo_entity_1.Todo)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TodoService);
//# sourceMappingURL=todo.service.js.map