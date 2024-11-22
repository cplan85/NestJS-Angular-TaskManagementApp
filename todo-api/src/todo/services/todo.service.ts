import { Injectable } from "@nestjs/common";
import { Todo } from "../entities/todo.entity";
import { Repository } from "typeorm";
import { TodoItem } from "../gateway/todo.interface";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()

export class TodoService {

    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>) {
    }

    findAll(): Promise<TodoItem[]> {
        return this.todoRepository.find();
    }

    saveAll(todoItems: TodoItem[]): Promise<TodoItem[]> {
        return this.todoRepository.save(todoItems);
    }

    save(todoItem: TodoItem): Promise<TodoItem> {
        return this.todoRepository.save(todoItem);
    }

    //this is where we can update all todos within a single column
    async updateMultiple(todoItems: TodoItem[]): Promise<TodoItem[]> {
        // Create an array of promises to update each item
        const updatePromises = todoItems.map(async (todoItem) => {
            await this.todoRepository.update(todoItem.id, todoItem);
            return this.todoRepository.findOne({
                where: {
                    id: todoItem.id
                }
            });
        });
    
        // Wait for all promises to resolve
        const updatedItems = await Promise.all(updatePromises);
    
        return updatedItems;
    }
    

    async update(todoItem: TodoItem): Promise<TodoItem> {
         await this.todoRepository.update(todoItem.id, todoItem);
         const updatedItem = await this.todoRepository.findOne( {
            where: {
                id: todoItem.id
            }
         });

         return updatedItem
     
    }

}