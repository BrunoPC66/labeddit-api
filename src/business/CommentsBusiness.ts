import { CommentsDatabase } from "../database/CommentsDatabase"
import { PostDatabase } from "../database/PostDatabase"
import { DeleteCommentInputDTO } from "../dtos/dto-comments/deleteComments.dto"
import { GetCommentsInputDTO } from "../dtos/dto-comments/getCommentsDTO"
import { NewCommentInputDTO } from "../dtos/dto-comments/newComment.dto"
import { UpdateCommentInputDTO } from "../dtos/dto-comments/updateComment.dto"
import { BadRequest } from "../errors/BadRequest"
import { Comments, CommentsDB, CommentsModel } from "../models/Comments"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export class CommentsBusiness {
    constructor(
        private commentsDataBase: CommentsDatabase,
        private postDatabase: PostDatabase,
        private tokenManager: TokenManager
    ) { }

    public getComments = async (input: GetCommentsInputDTO): Promise<CommentsModel[]> => {
        const {
            postId,
            token
        } = input

        const payload = await this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequest("Faça o login para interagir nos posts")
        }

        const postDB = await this.postDatabase.findPostById(postId)

        const commentsDB = await this.commentsDataBase.findPostComments(postId)

        if (postDB) {
            if (!commentsDB) {
                throw new BadRequest("Post ainda sem comentários")
            }
        } else {
            throw new BadRequest("Post não encontrado")
        }

        const output: CommentsModel[] = commentsDB.map(comment =>
            new Comments(
                comment.id,
                comment.post_id,
                comment.user_id,
                comment.creator_name,
                comment.content,
                comment.created_at,
                comment.updated_at
            ).commentsToBusiness()
        )

        return output
    }

    // public getCommentById = async (input: GetCommentsInputDTO): Promise<CommentsModel[]> => {
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

    //     const commentsDB = await this.commentsDataBase.findPostComments(postId)

    //     if (postDB) {
    //         if (!commentsDB) {
    //             throw new BadRequest("Post ainda sem comentários")
    //         }
    //     } else {
    //         throw new BadRequest("Post não encontrado")
    //     }

    //     const output: CommentsModel[] = commentsDB.map(comment =>
    //         new Comments(
    //             comment.id,
    //             comment.post_id,
    //             comment.user_id,
    //             comment.creator_name,
    //             comment.content,
    //             comment.created_at,
    //             comment.updated_at
    //         ).commentsToBusiness()
    //     )

    //     return output
    // }

    public newComment = async (input: NewCommentInputDTO): Promise <void> => {
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

        const newComment: CommentsDB = new Comments(
            id,
            postId,
            payload.id,
            payload.name,
            content,
            new Date().toISOString(),
            new Date().toISOString()
        ).commentsToDB()
        
        await this.commentsDataBase.insertComment(newComment)
    }

    public updateComment = async (input: UpdateCommentInputDTO): Promise <void> => {
        const {
            id,
            token,
            content
        } = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new BadRequest("Faça o login para interagir nos posts")
        }

        const commentDB = await this.commentsDataBase.findCommentById(id)

        if (!commentDB) {
            throw new BadRequest("Comentário não encontrado")
        }

        if (commentDB.user_id !== payload.id) {
            throw new BadRequest("Edição de comentário não permitida")
        }

        const comment = new Comments(
            commentDB.id,
            commentDB.post_id,
            commentDB.user_id,
            payload.name,
            commentDB.content,
            commentDB.created_at,
            new Date().toISOString()
        )

        if (content) {
            comment.setContent(content)
        }

        const editedComment = comment.commentsToDB()

        await this.commentsDataBase.updateComment(editedComment)
    }

    public deleteComment = async (input: DeleteCommentInputDTO): Promise<void> => {
        const {
            id,
            token
        } = input

        const payload = this.tokenManager.getPayload(token)

        if(!payload) {
            throw new BadRequest("Faça o login para interagir nos posts")
        }

        const commentDB = await this.commentsDataBase.findCommentById(id)

        if (!commentDB) {
            throw new BadRequest("Comentário não encontrado")
        }

        if (commentDB.user_id !== payload.id) {
            throw new BadRequest("Ação no comentário não permitida")
        }

        await this.commentsDataBase.deleteComment(id)
    }
}