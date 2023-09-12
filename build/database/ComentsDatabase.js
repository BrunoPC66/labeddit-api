"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComentsDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
const UserDatabase_1 = require("./UserDatabase");
class ComentsDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.findPostComents = (post) => __awaiter(this, void 0, void 0, function* () {
            const result = yield BaseDatabase_1.BaseDatabase
                .connection(ComentsDatabase.TABLE_COMENTS)
                .select(`${ComentsDatabase.TABLE_COMENTS}.id TEXT`, `${ComentsDatabase.TABLE_COMENTS}.post_id`, `${ComentsDatabase.TABLE_COMENTS}.user_id`, `${ComentsDatabase.TABLE_COMENTS}.content`, `${ComentsDatabase.TABLE_COMENTS}.created_at`, `${ComentsDatabase.TABLE_COMENTS}.updated_at`, `${UserDatabase_1.UserDatabase.TABLE_USERS}.name as creator_name`)
                .join(`${UserDatabase_1.UserDatabase.TABLE_USERS}`, `${ComentsDatabase.TABLE_COMENTS}.user_id`, "=", `${UserDatabase_1.UserDatabase.TABLE_USERS}.id`)
                .where({ post_id: post });
            return result;
        });
        this.findComentById = (id) => __awaiter(this, void 0, void 0, function* () {
            const [result] = yield BaseDatabase_1.BaseDatabase
                .connection(ComentsDatabase.TABLE_COMENTS)
                .select()
                .where({ id });
            return result;
        });
        this.insertComent = (coment) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(ComentsDatabase.TABLE_COMENTS)
                .insert(coment);
        });
        this.updateComent = (coment) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(ComentsDatabase.TABLE_COMENTS)
                .where({ post_id: coment.post_id })
                .update(coment);
        });
        this.deleteComent = (id) => __awaiter(this, void 0, void 0, function* () {
            yield BaseDatabase_1.BaseDatabase
                .connection(ComentsDatabase.TABLE_COMENTS)
                .del()
                .where({ id });
        });
    }
}
ComentsDatabase.TABLE_COMENTS = "coments";
exports.ComentsDatabase = ComentsDatabase;
//# sourceMappingURL=ComentsDatabase.js.map