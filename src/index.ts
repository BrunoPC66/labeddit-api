import express from "express";
import cors from "cors";
import { usersRouter } from "./router/UserRouter";
import { postsRouter } from "./router/PostRouter";
import { likeDislikeRouter } from "./router/LikeDislikeRouter";
import path from "path";
import { config } from "dotenv";
import dotenv from "dotenv";
import { commentsRouter } from "./router/CommentsRouter";


// const paths = [
//   path.resolve(__dirname, "../dotenv.env"),
//   path.resolve(__dirname, "../dotenv.env.example"),
// ];

// paths.find((validEnvPath) => !config({ path: validEnvPath }).error);

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.listen(Number(process.env.PORT) || 3003, () => {
  console.log(`Servidor rodando na porta ${Number(process.env.PORT) || 3003}`) 
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/posts", likeDislikeRouter);
app.use("/posts/:postId/comments", commentsRouter);
