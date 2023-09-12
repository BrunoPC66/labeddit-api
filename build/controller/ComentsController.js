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
exports.ComentsController = void 0;
const BaseError_1 = require("../errors/BaseError");
const getComentsDTO_1 = require("../dtos/dto-coments/getComentsDTO");
const newComent_dto_1 = require("../dtos/dto-coments/newComent.dto");
const updateComent_dto_1 = require("../dtos/dto-coments/updateComent.dto");
const deleteComents_dto_1 = require("../dtos/dto-coments/deleteComents.dto");
class ComentsController {
    constructor(comentsBusiness) {
        this.comentsBusiness = comentsBusiness;
        this.getComents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = getComentsDTO_1.GetComentsSchema.parse({
                    postId: req.params.post_id,
                    token: req.headers.authorization
                });
                const output = yield this.comentsBusiness.getComents(input);
                res.status(200).send(output);
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                    console.log(error);
                }
            }
        });
        this.newComent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = newComent_dto_1.NewComentSchema.parse({
                    postId: req.params.postId,
                    token: req.headers.authorization,
                    content: req.body.content
                });
                yield this.comentsBusiness.newComent(input);
                res.status(200).send("Comentário realizado com sucesso!");
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                    console.log(error);
                }
            }
        });
        this.updateComent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = updateComent_dto_1.UpdateComentSchema.parse({
                    id: req.params.id,
                    token: req.headers.authorization,
                    content: req.body.content
                });
                yield this.comentsBusiness.updateComent(input);
                res.status(200).send("Comentário editado com sucesso!");
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                    console.log(error);
                }
            }
        });
        this.deleteComent = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = deleteComents_dto_1.DeleteComentSchema.parse({
                    id: req.params.id,
                    token: req.headers.authorization
                });
                yield this.comentsBusiness.deleteComent(input);
                res.status(200).send("Comentário deletado com sucesso!");
            }
            catch (error) {
                if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send("Erro inesperado");
                    console.log(error);
                }
            }
        });
    }
}
exports.ComentsController = ComentsController;
//# sourceMappingURL=ComentsController.js.map