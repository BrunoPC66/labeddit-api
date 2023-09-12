import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { GetComentsSchema } from "../dtos/dto-coments/getComentsDTO";
import { ComentsBusiness } from "../business/ComentsBusiness";
import { NewComentSchema } from "../dtos/dto-coments/newComent.dto";
import { UpdateComentSchema } from "../dtos/dto-coments/updateComent.dto";
import { DeleteComentSchema } from "../dtos/dto-coments/deleteComents.dto";

export class ComentsController {
    constructor(
        private comentsBusiness: ComentsBusiness
    ) { }

    public getComents = async (req: Request, res: Response) => {
        try {
            const input = GetComentsSchema.parse({
                postId: req.params.post_id,
                token: req.headers.authorization
            })

            const output = await this.comentsBusiness.getComents(input)

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

    // public getComentById = async (req: Request, res: Response) => {
    //     try {
    //         const input = GetComentsSchema.parse({
    //             comentId: req.params.comentId,
    //             postId: req.params.post_id,
    //             token: req.headers.authorization
    //         })

    //         const output = await this.comentsBusiness.getComents(input)

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

    public newComent = async (req: Request, res: Response) => {
        try {
            const input = NewComentSchema.parse({
                postId: req.params.postId,
                token: req.headers.authorization,
                content: req.body.content
            })

            await this.comentsBusiness.newComent(input)

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

    public updateComent = async (req: Request, res: Response) => {
        try {
            const input = UpdateComentSchema.parse({
                id: req.params.id,
                token: req.headers.authorization,
                content: req.body.content
            })

            await this.comentsBusiness.updateComent(input)

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

    public deleteComent = async (req: Request, res: Response) => {
        try {
            const input = DeleteComentSchema.parse({
                id: req.params.id,
                token: req.headers.authorization
            })

            await this.comentsBusiness.deleteComent(input)

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