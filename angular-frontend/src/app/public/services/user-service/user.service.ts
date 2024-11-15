
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginResponseI, UserI } from '../../public.interfaces';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LOCALSTORAGE_KEY_NESTJS_TODO_APP } from '../../../app.module';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    private snackbar: MatSnackBar,
    private JwtService: JwtHelperService

  ) { }

  login(user: UserI): Observable<LoginResponseI> {
    return this.httpclient.post<LoginResponseI>('api/users/login', user).pipe(
      tap((res: LoginResponseI) => localStorage.setItem(LOCALSTORAGE_KEY_NESTJS_TODO_APP, res.access_token)),
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

  getLoggedInUser() {
    const decodedToken = this.JwtService.decodeToken();
    return decodedToken.user;
  }
}
