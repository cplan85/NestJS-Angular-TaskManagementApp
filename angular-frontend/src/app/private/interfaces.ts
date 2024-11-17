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