import { z } from "zod";

export interface EditPostInputDTO {
    postId: string,
    newContent?: string,
    token: string
}

export const EditPostSchema = z.object({
    postId: z.string().min(1),
    newContent: z.string().min(1).max(1000).optional(),
    token: z.string().min(1)
}).transform(data => data as EditPostInputDTO)