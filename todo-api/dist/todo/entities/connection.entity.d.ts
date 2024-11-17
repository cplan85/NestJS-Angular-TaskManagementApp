import { User } from "src/user/entities/user.entity";
export declare class Connection {
    id: number;
    socketId: string;
    connectedUser: User;
}
