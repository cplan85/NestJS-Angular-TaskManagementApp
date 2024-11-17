import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { UserI } from 'src/user/user.interfaces';
import { UserService } from 'src/user/user.service';
import { ConnectionService } from '../services/connection.service';
import { TodoService } from '../services/todo.service';

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
