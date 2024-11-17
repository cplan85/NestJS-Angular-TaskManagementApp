import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoItem } from "../gateway/todo.interface";

@Injectable()
export class SetupService implements OnApplicationBootstrap  {

    constructor(private todoService: TodoService) {

    }

    onApplicationBootstrap() {

       let items: TodoItem[] = [
            {
              title: 'Hard Item',
              subtitle: 'Hard Subtitle',
              text: 'Hard Text',
              status: "BACKLOG",
              urgency: "NO PRIORITY"
            },
            {
              title: 'Urgent Item',
              subtitle: 'Urgent Subtitle',
              text: 'Urgent Text',
              status: "BACKLOG",
              urgency: "URGENT"
            },
            {
              title: 'Medium Item',
              subtitle: 'Medium Subtitle',
              text: 'Medium Text',
              status: "TODO",
              urgency: "MEDIUM"
            }
          ]
        
    this.todoService.saveAll(items);
        
    }

}