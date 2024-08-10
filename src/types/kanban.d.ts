import { User } from "@/validators/user.validator";

export enum Statuses {
    NotStarted = 'not-started',
    InProgress = 'in-progress',
    Completed = 'completed',
    Scrapped = 'scrapped'
}

export type StatusesType = 'completed' | 'not-started' | 'in-progress' | 'scrapped'

export interface Task {
    name: string;
    description?: string;
    status: Statuses;
}

export interface Kanban {
    _id: string;
    name: string;
    description?: string;
    tasks: Array<Task>
    createdAt?: Date;
    updatedAt?: Date;
}