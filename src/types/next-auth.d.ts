import NextAuth from "next-auth"

// interface CUser {
//     id: string
//     username: string
//     email: string
//     currentPlan: 'free' | 'pet' | 'business'
//     isEmailVerified: boolean;
// }

declare module "next-auth" {
    interface Session {
        user: User
    }

    interface User {
        id: string
        username: string
        email: string
        currentPlan: 'free' | 'pet' | 'business'
        isEmailVerified: boolean;
        _v?: number;
    }
}
