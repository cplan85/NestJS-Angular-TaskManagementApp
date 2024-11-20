import { FormControl } from "@angular/forms";
import { UserI } from "../public/public.interfaces";
export type Status = 'BACKLOG' | 'TODO' | 'DONE'
export type Urgency = 'URGENT' | 'MEDIUM' | 'NO PRIORITY'
export interface TodoItem {
    id?: number;
    createdBy?: UserI;
    updatedBy?: UserI;
    createdAt?: Date;
    updatedAt?: Date;

    status: Status;
    title: string;
    subtitle: string;
    text: string;
    urgency: Urgency;

}

export interface CreateTodoFormGroup {
    status: FormControl<Status | null>;
    title: FormControl<string | null>;
    subtitle: FormControl<string | null>;
    text: FormControl<string | null>;
    urgency: FormControl<Urgency | null>;
}