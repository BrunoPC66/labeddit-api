import { ComentsDatabase } from "../database/ComentsDatabase"
import { PostDatabase } from "../database/PostDatabase"
import { DeleteComentInputDTO } from "../dtos/dto-coments/deleteComents.dto"
import { GetComentsInputDTO } from "../dtos/dto-coments/getComentsDTO"
import { NewComentInputDTO } from "../dtos/dto-coments/newComent.dto"
import { UpdateComentInputDTO } from "../dtos/dto-coments/updateComent.dto"
import { BadRequest } from "../errors/BadRequest"
import { Coments, ComentsDB, ComentsModel } from "../models/Coments"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class ComentsBusiness {
    constructor(
        private comentsDataBase: ComentsDatabase,
        private postDatabase: PostDatabase,
        private tokenManager: TokenManager
    ) { }

    public getComents = async (input: GetComentsInputDTO): Promise<ComentsModel[]> => {
        const {
            postId,
            token
        } = input

        const payload = await this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequest("Faça o login para interagir nos posts")
        }

        const postDB = await this.postDatabase.findPostById(postId)

        const comentsDB = await this.comentsDataBase.findPostComents(postId)

        if (postDB) {
            if (!comentsDB) {
                throw new BadRequest("Post ainda sem comentários")
            }
        } else {
            throw new BadRequest("Post não encontrado")
        }

        const output: ComentsModel[] = comentsDB.map(coment =>
            new Coments(
                coment.id,
                coment.post_id,
                coment.user_id,
                coment.creator_name,
                coment.content,
                coment.created_at,
                coment.updated_at
            ).comentsToBusiness()
        )

        return output
    }

    // public getComentById = async (input: GetComentsInputDTO): Promise<ComentsModel[]> => {
    //     const {
    //         q,
    //         postId,
    //         token
    //     } = input

    //     const payload = await this.tokenManager.getPayload(token)

    //     if (!payload) {
    //         throw new BadRequest("Faça o login para interagir nos posts")
    //     }

    //     const postDB = await this.postDatabase.findPostById(postId)

    //     const comentsDB = await this.comentsDataBase.findPostComents(postId)

    //     if (postDB) {
    //         if (!comentsDB) {
    //             throw new BadRequest("Post ainda sem comentários")
    //         }
    //     } else {
    //         throw new BadRequest("Post não encontrado")
    //     }

    //     const output: ComentsModel[] = comentsDB.map(coment =>
    //         new Coments(
    //             coment.id,
    //             coment.post_id,
    //             coment.user_id,
    //             coment.creator_name,
    //             coment.content,
    //             coment.created_at,
    //             coment.updated_at
    //         ).comentsToBusiness()
    //     )

    //     return output
    // }

    public newComent = async (input: NewComentInputDTO): Promise <void> => {
        const {
            postId,
            token,
            content
        } = input

        const payload = await this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequest("Faça o login para interagir nos posts")
        }
        
        const postDB = await this.postDatabase.findPostById(postId)
        
        if (!postDB) {
            throw new BadRequest("Post não encontrado")
        }

        const id = IdGenerator.generator()

        const newComent: ComentsDB = new Coments(
            id,
            postId,
            payload.id,
            payload.name,
            content,
            new Date().toISOString(),
            new Date().toISOString()
        ).comentsToDB()
        
        await this.comentsDataBase.insertComent(newComent)
    }

    public updateComent = async (input: UpdateComentInputDTO): Promise <void> => {
        const {
            id,
            token,
            content
        } = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new BadRequest("Faça o login para interagir nos posts")
        }

        const comentDB = await this.comentsDataBase.findComentById(id)

        if (!comentDB) {
            throw new BadRequest("Comentário não encontrado")
        }

        if (comentDB.user_id !== payload.id) {
            throw new BadRequest("Edição de comentário não permitida")
        }

        const coment = new Coments(
            comentDB.id,
            comentDB.post_id,
            comentDB.user_id,
            payload.name,
            comentDB.content,
            comentDB.created_at,
            new Date().toISOString()
        )

        if (content) {
            coment.setContent(content)
        }

        const editedComent = coment.comentsToDB()

        await this.comentsDataBase.updateComent(editedComent)
    }

    public deleteComent = async (input: DeleteComentInputDTO): Promise<void> => {
        const {
            id,
            token
        } = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new BadRequest("Faça o login para interagir nos posts")
        }

        const comentDB = await this.comentsDataBase.findComentById(id)

        if (!comentDB) {
            throw new BadRequest("Comentário não encontrado")
        }

        if (comentDB.user_id !== payload.id) {
            throw new BadRequest("Ação no comentário não permitida")
        }

        await this.comentsDataBase.deleteComent(id)
    }
}