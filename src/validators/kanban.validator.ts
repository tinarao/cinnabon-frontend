import { Statuses } from "@/types/kanban.d"
import { z } from "zod"

export const taskValidator = z.object({
    id: z.string(),
    name: z.string(),
    description: z.ostring(),
    status: z.nativeEnum(Statuses)
})

export const kanbanValidator = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.ostring(),
    tasks: z.array(taskValidator),
    createdAt: z.any(),
    updatedAt: z.any(),
    __v: z.onumber()
})


export const kanbansArrayValidator = z.array(kanbanValidator)