import {MatDividerModule} from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PrivateRoutingModule } from './private-routing.module';
import { CardComponent } from './components/card/card.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    DashboardComponent,
    CardComponent,
    CreateTodoComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    DragDropModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class PrivateModule { }
