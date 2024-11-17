import { io } from 'socket.io-client';
import { Injectable } from "@angular/core";
import { tokenGetter } from '../../app.module';
import { TodoItem } from '../interfaces';


@Injectable({
    providedIn: 'root'
})

export class TodoService {

    socket = io('http://localhost:3000/todos', {
        auth: {
            Authorization: `Bearer ${tokenGetter()}`
        }
    })

    public sendMessage() {
        this.socket.emit('message', "received a message");
    }

    public getTodos() {
            this.socket.on('todos', (todos: TodoItem[]) => {
                todos.forEach(t => console.log(t));
              })
            this.socket.on('Error', (error) => { console.error('WebSocket error:', error); });
     
      }

}