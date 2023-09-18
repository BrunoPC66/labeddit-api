import { z } from "zod";

export interface NewCommentInputDTO {
    postId: string,
    token: string,
    content: string
}

export const NewCommentSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1),
    content: z.string().min(1)
}).transform(data => data as NewCommentInputDTO)