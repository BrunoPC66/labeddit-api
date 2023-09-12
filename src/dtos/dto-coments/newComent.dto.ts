import { z } from "zod";

export interface NewComentInputDTO {
    postId: string,
    token: string,
    content: string
}

export const NewComentSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1),
    content: z.string().min(1)
}).transform(data => data as NewComentInputDTO)