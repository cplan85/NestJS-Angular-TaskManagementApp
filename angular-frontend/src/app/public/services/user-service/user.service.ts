import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginResponseI, UserI } from '../../public.interfaces';
import { catchError, Observable, tap, throwError } from 'rxjs';

export const snackBarConfig: MatSnackBarConfig = {
  duration: 2500,
  horizontalPosition: 'right',
  verticalPosition: 'top'
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpclient: HttpClient,
    private snackbar: MatSnackBar
  ) { }

  login(user: UserI): Observable<LoginResponseI> {
    return this.httpclient.post<LoginResponseI>('api/users/login', user).pipe(
      tap((res: LoginResponseI) => localStorage.setItem('nestjs_todo_app', res.access_token)),
      tap(() => this.snackbar.open('Login successful', 'Close', snackBarConfig)),
      catchError(e => {
        this.snackbar.open(`${e.error.message}`, 'Close', snackBarConfig)
        return throwError(e);
      })
    )
  }

  register(user: UserI): Observable<UserI> {
    console.log("MY user", user)
    return this.httpclient.post<UserI>('api/users', user).pipe(
      tap((createdUser: UserI) => this.snackbar.open(`User ${createdUser.username} was created successfully`, 'Close', snackBarConfig)),
      catchError(e => {
        console.log(e, "My error")
        this.snackbar.open(`User could not be created: ${e.error.message}`, 'Close', snackBarConfig)
        return throwError(e);
      })
    )
  }
}
