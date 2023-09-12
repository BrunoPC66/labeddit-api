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
exports.ComentsBusiness = void 0;
const BadRequest_1 = require("../errors/BadRequest");
const Coments_1 = require("../models/Coments");
const IdGenerator_1 = require("../services/IdGenerator");
class ComentsBusiness {
    constructor(comentsDataBase, postDatabase, tokenManager) {
        this.comentsDataBase = comentsDataBase;
        this.postDatabase = postDatabase;
        this.tokenManager = tokenManager;
        this.getComents = (input) => __awaiter(this, void 0, void 0, function* () {
            const { postId, token } = input;
            const payload = yield this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequest_1.BadRequest("Faça o login para interagir nos posts");
            }
            const postDB = yield this.postDatabase.findPostById(postId);
            const comentsDB = yield this.comentsDataBase.findPostComents(postId);
            if (postDB) {
                if (!comentsDB) {
                    throw new BadRequest_1.BadRequest("Post ainda sem comentários");
                }
            }
            else {
                throw new BadRequest_1.BadRequest("Post não encontrado");
            }
            const output = comentsDB.map(coment => new Coments_1.Coments(coment.id, coment.post_id, coment.user_id, coment.creator_name, coment.content, coment.created_at, coment.updated_at).comentsToBusiness());
            return output;
        });
        this.newComent = (input) => __awaiter(this, void 0, void 0, function* () {
            const { postId, token, content } = input;
            const payload = yield this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequest_1.BadRequest("Faça o login para interagir nos posts");
            }
            const postDB = yield this.postDatabase.findPostById(postId);
            if (!postDB) {
                throw new BadRequest_1.BadRequest("Post não encontrado");
            }
            const id = IdGenerator_1.IdGenerator.generator();
            const newComent = new Coments_1.Coments(id, postId, payload.id, payload.name, content, new Date().toISOString(), new Date().toISOString()).comentsToDB();
            yield this.comentsDataBase.insertComent(newComent);
        });
        this.updateComent = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token, content } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequest_1.BadRequest("Faça o login para interagir nos posts");
            }
            const comentDB = yield this.comentsDataBase.findComentById(id);
            if (!comentDB) {
                throw new BadRequest_1.BadRequest("Comentário não encontrado");
            }
            if (comentDB.user_id !== payload.id) {
                throw new BadRequest_1.BadRequest("Edição de comentário não permitida");
            }
            const coment = new Coments_1.Coments(comentDB.id, comentDB.post_id, comentDB.user_id, payload.name, comentDB.content, comentDB.created_at, new Date().toISOString());
            if (content) {
                coment.setContent(content);
            }
            const editedComent = coment.comentsToDB();
            yield this.comentsDataBase.updateComent(editedComent);
        });
        this.deleteComent = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (!payload) {
                throw new BadRequest_1.BadRequest("Faça o login para interagir nos posts");
            }
            const comentDB = yield this.comentsDataBase.findComentById(id);
            if (!comentDB) {
                throw new BadRequest_1.BadRequest("Comentário não encontrado");
            }
            if (comentDB.user_id !== payload.id) {
                throw new BadRequest_1.BadRequest("Ação no comentário não permitida");
            }
            yield this.comentsDataBase.deleteComent(id);
        });
    }
}
exports.ComentsBusiness = ComentsBusiness;
//# sourceMappingURL=ComentsBusiness.js.map