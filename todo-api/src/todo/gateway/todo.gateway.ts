import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { UserI } from 'src/user/user.interfaces';
import { UserService } from 'src/user/user.service';
import { ConnectionService } from '../services/connection.service';
import { TodoService } from '../services/todo.service';
import { ConnectionI, TodoItem } from './todo.interface';

@WebSocketGateway({
  namespace: 'todos',
  cors: {origin: ['http://localhost:3000', 'http://localhost:4200']}
})
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;

  constructor(private userService: UserService,
    private authService: AuthService,
    private connectionService: ConnectionService,
    private todoService: TodoService
    ) {

  }

  async handleDisconnect(socket: Socket) {
    
    //remove the connection from our database
    await this.connectionService.deleteBySocketId(socket.id);
    socket.disconnect()
  }

  @SubscribeMessage('addTodo')
  async onAddTodo(socket: Socket, todoItem: TodoItem): Promise<void> {
    //save new todoItem to our Database
    const createTodoItem: TodoItem = await this.todoService.save(todoItem);

    //publish the new todoItem to all connected Users
    const connections: ConnectionI[] = await this.connectionService.findAll();

    for(const connection of connections) {
      this.server.to(connection.socketId).emit('addedTodo', createTodoItem)
    }
  }

  @SubscribeMessage('updateTodo') 
    async onUpdateTodo(socket: Socket, todoItem: TodoItem) {
    
    const updatedTodoItem: TodoItem = await this.todoService.update(todoItem)

    const connections: ConnectionI[] = await this.connectionService.findAll();

    for(const connection of connections) {
      this.server.to(connection.socketId).emit('updatedTodo', updatedTodoItem)
    }

    }

    //new
    @SubscribeMessage('updateColumnTodos') 
    async onUpdateColumnTodos(socket: Socket, todoItems: TodoItem[]) {
      const updatedTodoItems: TodoItem[] = await this.todoService.updateMultiple(todoItems)


          //publish the new todoItem to all connected Users
    const connections: ConnectionI[] = await this.connectionService.findAll();

    for(const connection of connections) {
      this.server.to(connection.socketId).emit('updatedColumnTodos', updatedTodoItems)
    }

    }
  

  async handleConnection(socket: Socket) {

    try {

    const token = socket.handshake.auth.Authorization.split(' ')[1];
          // if the token is not verified, this will throuw and we can catch & disconnect the user
    const decodedToken = await this.authService.verifyJwt(token);

    // Extract the user ID from the decoded token 
    const userId = decodedToken.user.id;

    const user: UserI = await this.userService.getOneUserById(userId);

    if(!user) {
      console.log('disconnect user')
      return this.disconnect(socket);
    } else {
      console.log('do something', user)

      await this.connectionService.create({socketId: socket.id, connectedUser: user})

      // get all todos from our database
      const todos = await this.todoService.findAll();

      // only emit todos to the specific connected client
      return this.server.to(socket.id).emit('todos', todos);
    }
    } catch {
      console.log('disconnect user')
      return this.disconnect(socket);
    }

  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();

}
}
