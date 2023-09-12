import express from "express"
import { ComentsController } from "../controller/ComentsController"
import { ComentsBusiness } from "../business/ComentsBusiness"
import { ComentsDatabase } from "../database/ComentsDatabase"
import { TokenManager } from "../services/TokenManager"
import { PostDatabase } from "../database/PostDatabase"

export const comentsRouter = express.Router()

const comentsController = new ComentsController(
    new ComentsBusiness(
        new ComentsDatabase(),
        new PostDatabase(),
        new TokenManager()
    )
)

comentsRouter.get("/", comentsController.getComents)
// comentsRouter.get("/:id", comentsController.getComentsById)
comentsRouter.post("/", comentsController.newComent)
comentsRouter.put("/:comentId", comentsController.updateComent)
comentsRouter.delete("/:comentId", comentsController.deleteComent)