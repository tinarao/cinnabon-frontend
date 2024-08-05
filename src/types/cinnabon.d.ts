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

    name: string;

    creator: User;
    creatorId: string;

    key: string;

    requests: number;
    limit: number;

    sessions: Session[]
}