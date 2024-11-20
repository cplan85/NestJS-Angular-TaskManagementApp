import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateTodoFormGroup, Status, Urgency } from '../../private-module.interfaces';
import { statusValues, urgencyValues } from '../../private-module.constants';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrl: './create-todo.component.scss'
})
export class CreateTodoComponent {

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

  onCreateTodo() {

    if(this.form.valid) {
      console.log(this.form.value);
    }
    
  }

}
