import { CanActivateFn } from '@angular/router';
import { LOCALSTORAGE_KEY_NESTJS_TODO_APP } from './app.module';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem(LOCALSTORAGE_KEY_NESTJS_TODO_APP);
  if (token) {
    return true;
  } else {
    // Optionally, you can redirect to the public route or show a message
    return false;
  }
};