import { z } from "zod"

export interface DeleteComentInputDTO {
    id: string,
    token: string
}

export const DeleteComentSchema = z.object({
    id: z.string().min(1),
    token: z.string().min(1)
}).transform(data => data as DeleteComentInputDTO)