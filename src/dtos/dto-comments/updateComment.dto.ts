import { z } from "zod"

export interface UpdateCommentInputDTO {
    id: string,
    token: string,
    content?: string
}

export const UpdateCommentSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(1),
    content: z.string().min(1).optional()
}).transform(data => data as UpdateCommentInputDTO)