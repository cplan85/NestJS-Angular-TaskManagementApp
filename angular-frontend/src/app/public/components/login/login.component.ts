import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor (private userService: UserService, private router: Router ) {
  }

  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  },)

login(){
  if(this.form.valid) {
    this.userService.login({
      email: this.email.value,
      password: this.password.value
    }).pipe(
      tap(() => this.router.navigate( ['../../private/dashboard'] ))
    ).subscribe()
  }
}

get email(): FormControl {
  return this.form.get('email') as FormControl;
}

get password(): FormControl {
  return this.form.get('password') as FormControl;
}

}
