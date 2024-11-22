import { OnApplicationBootstrap } from "@nestjs/common";
import { TodoService } from "./todo.service";
export declare class SetupService implements OnApplicationBootstrap {
    private todoService;
    constructor(todoService: TodoService);
    onApplicationBootstrap(): Promise<void>;
}
