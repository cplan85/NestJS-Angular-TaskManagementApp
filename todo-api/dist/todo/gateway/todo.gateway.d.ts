import { OnGatewayConnection } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from 'src/auth/services/auth.service';
import { UserService } from 'src/user/user.service';
export declare class TodoGateway implements OnGatewayConnection {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    handleConnection(socket: Socket): Promise<void>;
    private disconnect;
}
