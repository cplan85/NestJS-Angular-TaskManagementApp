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
exports.SetupService = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
let SetupService = class SetupService {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async onApplicationBootstrap() {
        const todos = await this.todoService.findAll();
        if (todos.length === 0) {
            let items = [
                {
                    title: 'Hard Item',
                    subtitle: 'Hard Subtitle',
                    text: 'Hard Text',
                    status: "BACKLOG",
                    urgency: "NO PRIORITY",
                    containerIndex: 0
                },
                {
                    title: 'Urgent Item',
                    subtitle: 'Urgent Subtitle',
                    text: 'Urgent Text',
                    status: "TODO",
                    urgency: "URGENT",
                    containerIndex: 0
                },
                {
                    title: 'Medium Item',
                    subtitle: 'Medium Subtitle',
                    text: 'Medium Text',
                    status: "DONE",
                    urgency: "MEDIUM",
                    containerIndex: 0
                }
            ];
            this.todoService.saveAll(items);
        }
    }
};
exports.SetupService = SetupService;
exports.SetupService = SetupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], SetupService);
//# sourceMappingURL=setup.service.js.map