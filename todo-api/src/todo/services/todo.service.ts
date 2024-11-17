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
}