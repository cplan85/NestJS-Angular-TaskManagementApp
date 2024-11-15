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
exports.TodoGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const auth_service_1 = require("../../auth/services/auth.service");
const user_service_1 = require("../../user/user.service");
let TodoGateway = class TodoGateway {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async handleConnection(socket) {
        try {
            const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
            const userId = decodedToken.user.id;
            const user = await this.userService.getOneUserById(userId);
            if (!user) {
                console.log('disconnect user');
                return this.disconnect(socket);
            }
            else {
                console.log('do something', user);
            }
        }
        catch {
            console.log('disconnect user');
            return this.disconnect(socket);
        }
    }
    disconnect(socket) {
        socket.emit('Error', new common_1.UnauthorizedException());
        socket.disconnect();
    }
};
exports.TodoGateway = TodoGateway;
exports.TodoGateway = TodoGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'todos',
        cors: { origin: ['http://localhost:3000', 'http://localhost:4200'] }
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, auth_service_1.AuthService])
], TodoGateway);
//# sourceMappingURL=todo.gateway.js.map