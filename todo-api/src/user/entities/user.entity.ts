import { Connection } from "src/todo/entities/connection.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username: string;

    @Column({unique:true})
    email: string;

    @Column({select: false})
    password: string;

    @OneToMany(() => Connection, (connection: Connection) => connection.connectedUser)
    connections: Connection[];

    @BeforeInsert()
    @BeforeUpdate()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
        this.username = this.username.toLowerCase();
    }
} 
