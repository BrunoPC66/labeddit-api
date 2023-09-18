import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { GetCommentsSchema } from "../dtos/dto-comments/getCommentsDTO";
import { CommentsBusiness } from "../business/CommentsBusiness";
import { NewCommentSchema } from "../dtos/dto-comments/newComment.dto";
import { UpdateCommentSchema } from "../dtos/dto-comments/updateComment.dto";
import { DeleteCommentSchema } from "../dtos/dto-comments/deleteComments.dto";

export class CommentsController {
    constructor(
        private commentsBusiness: CommentsBusiness
    ) { }

    public getComments = async (req: Request, res: Response) => {
        try {
            const input = GetCommentsSchema.parse({
                postId: req.params.post_id,
                token: req.headers.authorization
            })

            const output = await this.commentsBusiness.getComments(input)

            res.status(200).send(output)

        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
                console.log(error);
            }
        }
    }

    // public getCommentById = async (req: Request, res: Response) => {
    //     try {
    //         const input = GetCommentsSchema.parse({
    //             commentId: req.params.commentId,
    //             postId: req.params.post_id,
    //             token: req.headers.authorization
    //         })

    //         const output = await this.commentsBusiness.getComments(input)

    //         res.status(200).send(output)

    //     }
    //     catch (error) {
    //         if (error instanceof BaseError) {
    //             res.status(error.statusCode).send(error.message)
    //         } else {
    //             res.status(500).send("Erro inesperado")
    //             console.log(error);
    //         }
    //     }
    // }

    public newComment = async (req: Request, res: Response) => {
        try {
            const input = NewCommentSchema.parse({
                postId: req.params.postId,
                token: req.headers.authorization,
                content: req.body.content
            })

            await this.commentsBusiness.newComment(input)

            res.status(200).send("Comentário realizado com sucesso!")
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
                console.log(error);
            }
        }
    }

    public updateComment = async (req: Request, res: Response) => {
        try {
            const input = UpdateCommentSchema.parse({
                id: req.params.id,
                token: req.headers.authorization,
                content: req.body.content
            })

            await this.commentsBusiness.updateComment(input)

            res.status(200).send("Comentário editado com sucesso!")
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
                console.log(error);
            }
        }
    }

    public deleteComment = async (req: Request, res: Response) => {
        try {
            const input = DeleteCommentSchema.parse({
                id: req.params.id,
                token: req.headers.authorization
            })

            await this.commentsBusiness.deleteComment(input)

            res.status(200).send("Comentário deletado com sucesso!")
        }
        catch (error) {
            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
                console.log(error);
            }
        }
    }
}