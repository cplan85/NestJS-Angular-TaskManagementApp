import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status, Urgency } from "../gateway/todo.interface";

@Entity()
export class Todo {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    status: Status;

    @Column()
    title: string;

    @Column()
    subtitle: string;

    @Column()
    text: string;

    @Column()
    urgency: Urgency

    // createdBy?: UserI;
    // updatedBy?: UserI;
    // createdAt?: Date;
    // updatedAt?: Date;


}