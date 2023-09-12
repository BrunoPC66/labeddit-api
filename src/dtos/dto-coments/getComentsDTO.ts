import { z } from "zod";

export interface GetComentsInputDTO {
    q?: string,
    postId: string,
    token: string
}

export const GetComentsSchema = z.object({
    q: z.string().min(1).optional(),
    postId: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as GetComentsInputDTO)