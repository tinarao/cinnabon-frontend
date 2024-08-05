import { User } from "@/validators/user.validator";

interface Session {
    _id: string;
    username: string;
    password: string;

    lastIp: string;
    email?: string;
    phone?: string;
}

interface Cinnabon {
    _id: string;

    creator: User;
    creatorId: string;

    projectName: string;
    key: string;

    requests: number;
    limit: number;
    plan: string;

    sessions: Session[]
}