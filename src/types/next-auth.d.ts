import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: User
    }

    interface User {
        id: string
        username: string
        email: string
        currentPlan: 'free' | 'pro'
        isEmailVerified: boolean;
        _v?: number;
    }
}
