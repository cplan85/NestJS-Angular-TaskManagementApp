import { Component, Input } from '@angular/core';
import { TodoItem } from '../../private-module.interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {

  @Input() item: TodoItem | undefined;

}
