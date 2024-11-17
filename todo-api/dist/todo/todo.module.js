"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModule = void 0;
const common_1 = require("@nestjs/common");
const todo_gateway_1 = require("./gateway/todo.gateway");
const user_module_1 = require("../user/user.module");
const auth_module_1 = require("../auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const connection_entity_1 = require("./entities/connection.entity");
const todo_entity_1 = require("./entities/todo.entity");
const todo_service_1 = require("./services/todo.service");
const connection_service_1 = require("./services/connection.service");
const setup_service_1 = require("./services/setup.service");
let TodoModule = class TodoModule {
};
exports.TodoModule = TodoModule;
exports.TodoModule = TodoModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([connection_entity_1.Connection, todo_entity_1.Todo])
        ],
        providers: [todo_gateway_1.TodoGateway, todo_service_1.TodoService, connection_service_1.ConnectionService, setup_service_1.SetupService]
    })
], TodoModule);
//# sourceMappingURL=todo.module.js.map