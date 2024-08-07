import { z } from "zod"

export const kanbanValidator = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.ostring(),
    tasks: z.array(z.any()),
    createdAt: z.any(),
    updatedAt: z.any(),
    __v: z.onumber()
})


export const kanbansArrayValidator = z.array(kanbanValidator)