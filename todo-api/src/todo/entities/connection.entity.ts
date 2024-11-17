import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Connection {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    socketId: string;

    //one user could have many connections, e.g. one on his desktop and one on mobile
    @ManyToOne(() => User, (user: User) => user.connections)
    @JoinColumn()
    connectedUser: User;
}