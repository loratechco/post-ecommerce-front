import { z } from "zod";

export const schemaEditGroupAndCreatGroup = z.object({
    name: z.string().min(1, 'The group name is required').max(80, 'The length of the name field is 80 characters'),
    description: z.string().min(1, 'The group description is required').max(800, 'The length of the name field is 800 characters'),
})

export type Submit = z.infer<typeof schemaEditGroupAndCreatGroup>;