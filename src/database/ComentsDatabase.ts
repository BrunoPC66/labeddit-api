import { ComentsDB, ComentsDBPlusCreatorName } from "../models/Coments";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class ComentsDatabase extends BaseDatabase {
    static TABLE_COMENTS = "coments"

    public findPostComents = async (post: string): Promise<ComentsDBPlusCreatorName[] | undefined> => {
        const result = await BaseDatabase
            .connection(ComentsDatabase.TABLE_COMENTS)
            .select(
                `${ComentsDatabase.TABLE_COMENTS}.id TEXT`,
                `${ComentsDatabase.TABLE_COMENTS}.post_id`,
                `${ComentsDatabase.TABLE_COMENTS}.user_id`,
                `${ComentsDatabase.TABLE_COMENTS}.content`,
                `${ComentsDatabase.TABLE_COMENTS}.created_at`,
                `${ComentsDatabase.TABLE_COMENTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.name as creator_name`
            )
            .join(
                `${UserDatabase.TABLE_USERS}`,
                `${ComentsDatabase.TABLE_COMENTS}.user_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ post_id: post })

        return result
    }

    public findComentById = async (id: string): Promise<ComentsDB> => {
        const [result] = await BaseDatabase
            .connection(ComentsDatabase.TABLE_COMENTS)
            .select()
            .where({ id })

        return result
    }

    public insertComent = async (coment: ComentsDB): Promise<void> => {
        await BaseDatabase
            .connection(ComentsDatabase.TABLE_COMENTS)
            .insert(coment)
    }

    public updateComent = async (coment: ComentsDB): Promise<void> => {
        await BaseDatabase
            .connection(ComentsDatabase.TABLE_COMENTS)
            .where({ post_id: coment.post_id })
            .update(coment)
    }

    public deleteComent = async (id: string): Promise<void> => {
        await BaseDatabase
            .connection(ComentsDatabase.TABLE_COMENTS)
            .del()
            .where({ id })
    }
}