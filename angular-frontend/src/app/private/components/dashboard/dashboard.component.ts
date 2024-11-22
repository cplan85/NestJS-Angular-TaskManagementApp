import { CreateTodoComponent } from './../create-todo/create-todo.component';
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoItem } from '../../private-module.interfaces';
//import { todoExampleItems } from '../../private-module.constants';
import { Observable, tap } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent implements OnInit {

  createTodoComponentDialogueRef: MatDialogRef<CreateTodoComponent> | undefined;


  backlogItems: TodoItem[] = []
  todoItems: TodoItem[] = [];
  doneItems: TodoItem[] = [];

  items$: Observable<TodoItem[]>;

  constructor(private todoService: TodoService, private matDialog: MatDialog) {
    this.items$ = this.todoService.todoItems$
  }


  ngOnInit() {
    this.todoService.getTodos();
    this.todoService.getAddedTodo();
    this.todoService.getUpdatedTodos();
    this.todoService.getUpdatedColumnTodos();

    this.items$.pipe(
      tap((items) => {
       
        this.backlogItems = items.filter(item => item.status === 'BACKLOG');
        this.todoItems = items.filter(item => item.status === 'TODO');
        this.doneItems = items.filter(item => item.status === 'DONE');
        
        //if this works apply to other item categories
        this.backlogItems = this.backlogItems.sort((a, b) => a.containerIndex! - b.containerIndex!);
        this.todoItems = this.todoItems.sort((a, b) => a.containerIndex! - b.containerIndex!);
        this.doneItems = this.doneItems.sort((a, b) => a.containerIndex! - b.containerIndex!);

      })
    ).subscribe();
  }

  drop(event: CdkDragDrop<TodoItem[]>) {
    if (event.previousContainer === event.container) {
      //Todo - if it is the same container get a list of all the changed items
      // this should only be two items

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      event.container.data.forEach((item, i) => {
        item.containerIndex = i
      })

      this.todoService.updateColumnTodos(event.container.data);
      
    } else {
      //todo updateTodo
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const allPreviousTodoItems = this.updateContainerTodoIndexes([...event.previousContainer.data])

      const allCurrentTodoItems = this.updateContainerTodoIndexes([...event.container.data])

      const allChangedTodoItems = [...allPreviousTodoItems, ...allCurrentTodoItems]

      let updatedItem: TodoItem = event.container.data[event.currentIndex];
      updatedItem.containerIndex = event.currentIndex;
      
      this.todoService.updateTodo(updatedItem, event.container.id);


      this.todoService.updateColumnTodos(allChangedTodoItems);


    }

 
    //console.log("backlog",this.backlogItems, "todo", this.todoItems, "done",  this.doneItems)



    this.todoService.todoItems$.next([...this.backlogItems,...this.todoItems,...this.doneItems])

  }

  updateContainerTodoIndexes(todos: TodoItem[]) {

    todos.forEach((item, i) => {
      item.containerIndex = i
    })
    return todos;
  }

  onShowCreateTodoDialog() {
    this.matDialog.open(CreateTodoComponent, {
      minHeight: '400px',
      minWidth: '300px'
    })
  }

}
