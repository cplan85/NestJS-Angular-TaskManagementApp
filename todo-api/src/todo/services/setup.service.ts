import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoItem } from "../gateway/todo.interface";

@Injectable()
export class SetupService implements OnApplicationBootstrap  {

    constructor(private todoService: TodoService) {

    }

    async onApplicationBootstrap() {

      const todos = await this.todoService.findAll();


      if (todos.length === 0) {

        let items: TodoItem[] = [
          {
            title: 'Hard Item',
            subtitle: 'Hard Subtitle',
            text: 'Hard Text',
            status: "BACKLOG",
            urgency: "NO PRIORITY",
            containerIndex: 0
          },
          {
            title: 'Urgent Item',
            subtitle: 'Urgent Subtitle',
            text: 'Urgent Text',
            status: "TODO",
            urgency: "URGENT",
            containerIndex: 0
          },
          {
            title: 'Medium Item',
            subtitle: 'Medium Subtitle',
            text: 'Medium Text',
            status: "DONE",
            urgency: "MEDIUM",
            containerIndex: 0
          }
        ]
      
  this.todoService.saveAll(items);
      }
    }

}