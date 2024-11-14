import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { UserI } from 'src/user/user.interfaces';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
  namespace: 'todos'
})
export class TodoGateway implements OnGatewayConnection {
  constructor(private userService: UserService, private authService: AuthService) {

  }

  async handleConnection(socket: Socket) {

    try {
          // if the token is not verified, this will throuw and we can catch & disconnect the user
    const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);

    // Extract the user ID from the decoded token 
    const userId = decodedToken.user.id;

    const user: UserI = await this.userService.getOneUserById(userId);

    if(!user) {
      console.log('disconnect user')
      return this.disconnect(socket);
    } else {
      console.log('do something', user)
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
