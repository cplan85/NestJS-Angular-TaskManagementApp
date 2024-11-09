import { Component } from '@angular/core';
import { Test, TestService } from './services/test.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-frontend';

  valueFromBackend$: Observable<Test>;

  constructor(private _testService: TestService) {
    this.valueFromBackend$ = this._testService.getUserById(1);
  }
}
