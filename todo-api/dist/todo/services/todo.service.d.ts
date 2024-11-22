import { Todo } from "../entities/todo.entity";
import { Repository } from "typeorm";
import { TodoItem } from "../gateway/todo.interface";
export declare class TodoService {
    private readonly todoRepository;
    constructor(todoRepository: Repository<Todo>);
    findAll(): Promise<TodoItem[]>;
    saveAll(todoItems: TodoItem[]): Promise<TodoItem[]>;
    save(todoItem: TodoItem): Promise<TodoItem>;
    updateMultiple(todoItems: TodoItem[]): Promise<TodoItem[]>;
    update(todoItem: TodoItem): Promise<TodoItem>;
}
