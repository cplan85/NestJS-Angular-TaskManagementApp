import { io } from 'socket.io-client';
import { Injectable } from "@angular/core";
import { tokenGetter } from '../../app.module';
import { Status, TodoItem } from '../private-module.interfaces';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class TodoService {

    //@ts-ignore
    public todoItems$: BehaviorSubject<TodoItem[]> = new BehaviorSubject([]);
    

    socket = io('http://localhost:3000/todos', {
        auth: {
            Authorization: `Bearer ${tokenGetter()}`
        }
    })

    public getTodos() {
            this.socket.on('todos', (todos: TodoItem[]) => {
                this.todoItems$.next(todos);
              })
            this.socket.on('Error', (error) => { console.error('WebSocket error:', error); });
     
      }

    public saveTodo(todoItem: TodoItem) {
        //emitting event to our addTodo Event name
        this.socket.emit('addTodo', todoItem)
    }

    public getAddedTodo(){
        this.socket.on('addedTodo', (todo: TodoItem ) => {
            console.log(this.todoItems$, "added todo Items")
            this.todoItems$.next([...this.todoItems$.value, todo]);
        })
    }

    public updateTodo(updatedItem: TodoItem, containerId: string): void {
        updatedItem.status = this.convertListIdToStatus(containerId)
       this.socket.emit('updateTodo', updatedItem);
    }

    //NEW FUNCTION 
    public updateColumnTodos(updatedItems: TodoItem[]): void {
       this.socket.emit('updateColumnTodos', updatedItems);
    }

    public getUpdatedColumnTodos() {
        this.socket.on('updatedColumnTodos', (todos: TodoItem[]) => {
          
            let idMap: any ={}
            todos.forEach(item => {
                idMap[`${item.id}`] = item.containerIndex
            })
        
            let items: TodoItem[] = this.todoItems$.value;

            let updatedItems: TodoItem[] = []

            items.forEach((todo, i) => {
                updatedItems.push(todo)
                if (`${todo.id}` in idMap) {
                    updatedItems[i].containerIndex = idMap[`${todo.id}`]
                }
            })

            this.todoItems$.next(updatedItems)

        })
    }

    public getUpdatedTodos() {
        this.socket.on('updatedTodo', (todo: TodoItem) => {
           
            const itemIndex: number = this.todoItems$.value.findIndex(i => i.id === todo.id);
            
            let items: TodoItem[] = this.todoItems$.value;
            items[itemIndex] = todo;
            this.todoItems$.next(items)
        })
    }

    private convertListIdToStatus(listId:string): Status {
        switch (listId){
            case 'cdk-drop-list-0':
            return 'BACKLOG'
            case 'cdk-drop-list-1':
            return 'TODO'
            case 'cdk-drop-list-2':
            return 'DONE'
            default:
                return 'BACKLOG'
        }
    }

}