import { z } from "zod"

export interface UpdateLikeDislikeInputDTO {
    postId: string,
    token: string
    like: boolean
}

export interface UpdateLikeDislikeOutputDTO {
    message: string | undefined
}

export const UpdateLikeDislikeSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(1),
    like: z.boolean()
}).transform(data => data as UpdateLikeDislikeInputDTO)