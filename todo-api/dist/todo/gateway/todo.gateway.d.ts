import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { UserService } from 'src/user/user.service';
import { ConnectionService } from '../services/connection.service';
import { TodoService } from '../services/todo.service';
import { TodoItem } from './todo.interface';
export declare class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private userService;
    private authService;
    private connectionService;
    private todoService;
    server: Server;
    constructor(userService: UserService, authService: AuthService, connectionService: ConnectionService, todoService: TodoService);
    handleDisconnect(socket: Socket): Promise<void>;
    onAddTodo(socket: Socket, todoItem: TodoItem): Promise<void>;
    onUpdateTodo(socket: Socket, todoItem: TodoItem): Promise<void>;
    onUpdateColumnTodos(socket: Socket, todoItems: TodoItem[]): Promise<void>;
    handleConnection(socket: Socket): Promise<boolean | void>;
    private disconnect;
}
