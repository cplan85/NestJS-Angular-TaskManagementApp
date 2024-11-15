import { io } from 'socket.io-client';
import { Injectable } from "@angular/core";
import { tokenGetter } from '../../app.module';


@Injectable({
    providedIn: 'root'
})

export class TodoService {

    socket = io('http://localhost:3000/todos', {
        auth: {
            Authorization: tokenGetter()
        }
    })

    public sendMessage() {
        this.socket.emit('message', "received a message");
    }
}