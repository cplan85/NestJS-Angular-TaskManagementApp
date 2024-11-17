import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { TodoItem } from '../../interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  backlogItems: TodoItem[] = [

  ]

  todoItems: TodoItem[] = [];
  doneItems: TodoItem[] = [];

  items: TodoItem[] = [
    {
      title: 'Hard Item',
      subtitle: 'Hard Subtitle',
      text: 'Hard Text',
      status: "BACKLOG",
      urgency: "NO PRIORITY"
    },
    {
      title: 'Urgent Item',
      subtitle: 'Urgent Subtitle',
      text: 'Urgent Text',
      status: "BACKLOG",
      urgency: "URGENT"
    },
    {
      title: 'Medium Item',
      subtitle: 'Medium Subtitle',
      text: 'Medium Text',
      status: "TODO",
      urgency: "MEDIUM"
    }
  ]



  constructor (private todoService: TodoService) {
    
  }

  ngOnInit(): void {
    this.todoService.getTodos();

    this.backlogItems = this.items.filter(item => item.status = "BACKLOG")
    this.todoItems = this.items.filter(item => item.status == 'TODO')
    this.doneItems = this.items.filter(item => item.status == 'DONE')
  }

  drop(event: CdkDragDrop<TodoItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
