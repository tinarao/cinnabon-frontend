import { User } from "@/validators/user.validator";

enum Statuses {
    NotStarted = 'not-started',
    InProgress = 'in-progress',
    Completed = 'completed',
    Scrapped = 'scrapped'
}

export interface Task {
    _id: string;
    name: string;
    description: string;
    status: Statuses.NotStarted;
}

export interface Kanban {
    _id: string;
    name: string;
    description: string;
    tasks: Array<Task>
    createdAt: Date;
    updatedAt: Date;
}