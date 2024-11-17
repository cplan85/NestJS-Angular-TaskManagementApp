import { Connection } from "src/todo/entities/connection.entity";
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    connections: Connection[];
    emailToLowerCase(): void;
}
