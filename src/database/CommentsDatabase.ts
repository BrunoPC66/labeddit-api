import { CommentsDB, CommentsDBPlusCreatorName } from "../models/Comments";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class CommentsDatabase extends BaseDatabase {
    static TABLE_COMMENTS = "comments"

    public findPostComments = async (post: string): Promise<CommentsDBPlusCreatorName[] | undefined> => {
        const result = await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .select(
                `${CommentsDatabase.TABLE_COMMENTS}.id TEXT`,
                `${CommentsDatabase.TABLE_COMMENTS}.post_id`,
                `${CommentsDatabase.TABLE_COMMENTS}.user_id`,
                `${CommentsDatabase.TABLE_COMMENTS}.content`,
                `${CommentsDatabase.TABLE_COMMENTS}.created_at`,
                `${CommentsDatabase.TABLE_COMMENTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${CommentsDatabase.TABLE_COMMENTS}.user_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ post_id: post })

        return result
    }

    public findCommentById = async (id: string): Promise<CommentsDB> => {
        const [result] = await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .select()
            .where({ id })

        return result
    }

    public insertComment = async (comment: CommentsDB): Promise<void> => {
        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .insert(comment)
    }

    public updateComment = async (comment: CommentsDB): Promise<void> => {
        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .where({ post_id: comment.post_id })
            .update(comment)
    }

    public deleteComment = async (id: string): Promise<void> => {
        await BaseDatabase
            .connection(CommentsDatabase.TABLE_COMMENTS)
            .del()
            .where({ id })
    }
}