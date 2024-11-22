import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateTodoFormGroup, Status, TodoItem, Urgency } from '../../private-module.interfaces';
import { statusValues, urgencyValues } from '../../private-module.constants';
import { TodoService } from '../../services/todo.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss'
})
export class CreateTodoComponent {

  constructor(private todoService: TodoService, private dialogRef: MatDialogRef<CreateTodoComponent>) {

  }

  form: FormGroup<CreateTodoFormGroup> = new FormGroup<CreateTodoFormGroup>({
    title: new FormControl('', [Validators.required]),
    subtitle: new FormControl('', [Validators.required]),
    status: new FormControl('TODO', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    urgency: new FormControl('MEDIUM', [Validators.required]),
  },)

  statusValues: Status[] = statusValues
  urgencyValues: Urgency[] = urgencyValues

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get subTitle(): FormControl {
    return this.form.get('subtitle') as FormControl;
  }
  
  get status(): FormControl {
    return this.form.get('status') as FormControl;
  }

  get text(): FormControl {
    return this.form.get('text') as FormControl;
  }

  get urgency(): FormControl {
    return this.form.get('urgency') as FormControl;
  }

  onCreateTodo() {

    if(this.form.valid) {

      const todo: TodoItem = {
        title: this.title.value,
        subtitle: this.subTitle.value,
        text: this.text.value,
        urgency: this.urgency.value,
        status: this.status.value,
      }

      console.log(todo, "TODO ON CREATE")

    const existingTodos = this.todoService.todoItems$.value.filter(todo => todo.status === todo.status);

    if (existingTodos.length === 0) { todo.containerIndex = 0 } 
    else { 
     const highestContainerIndex = Math.max(...existingTodos.map(todo => todo.containerIndex!));
     todo.containerIndex = highestContainerIndex + 1;
    }

     this.todoService.saveTodo(todo);
     this.dialogRef.close();
    }
    
  }

}
