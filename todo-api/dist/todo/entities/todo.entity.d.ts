import { Status, Urgency } from "../gateway/todo.interface";
export declare class Todo {
    id: number;
    status: Status;
    title: string;
    subtitle: string;
    text: string;
    urgency: Urgency;
}
