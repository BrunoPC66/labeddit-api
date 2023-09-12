import { z } from "zod";

export interface DeletePostInputDTO {
    postId: string,
    token: string
}

export const DeletePostSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as DeletePostInputDTO)