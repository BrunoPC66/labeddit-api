import { z } from "zod";

export interface GetCommentsInputDTO {
    q?: string,
    postId: string,
    token: string
}

export const GetCommentsSchema = z.object({
    q: z.string().min(1).optional(),
    postId: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as GetCommentsInputDTO)