import express from "express"
import { CommentsController } from "../controller/CommentsController"
import { CommentsBusiness } from "../business/CommentsBusiness"
import { CommentsDatabase } from "../database/CommentsDatabase"
import { TokenManager } from "../services/TokenManager"
import { PostDatabase } from "../database/PostDatabase"

export const commentsRouter = express.Router()

const commentsController = new CommentsController(
    new CommentsBusiness(
        new CommentsDatabase(),
        new PostDatabase(),
        new TokenManager()
    )
)

commentsRouter.get("/", commentsController.getComments)
// commentsRouter.get("/:id", commentsController.getCommentsById)
commentsRouter.post("/", commentsController.newComment)
commentsRouter.put("/:commentId", commentsController.updateComment)
commentsRouter.delete("/:commentId", commentsController.deleteComment)