import { z } from "zod"

export enum PricingPlans {
    Free = 'free',
    Pet = 'pet',
    Business = 'business'
}

export const userValidator = z.object({
    _id: z.string(),
    username: z.string(),
    currentPlan: z.nativeEnum(PricingPlans),
    isEmailVerified: z.boolean(),
    email: z.string(),
    createdAt: z.any(),
    updatedAt: z.any(),
    __v: z.onumber()
})

export type User = z.infer<typeof userValidator>