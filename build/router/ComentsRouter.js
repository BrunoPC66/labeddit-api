"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const ComentsController_1 = require("../controller/ComentsController");
const ComentsBusiness_1 = require("../business/ComentsBusiness");
const ComentsDatabase_1 = require("../database/ComentsDatabase");
const TokenManager_1 = require("../services/TokenManager");
const PostDatabase_1 = require("../database/PostDatabase");
exports.comentsRouter = express_1.default.Router();
const comentsController = new ComentsController_1.ComentsController(new ComentsBusiness_1.ComentsBusiness(new ComentsDatabase_1.ComentsDatabase(), new PostDatabase_1.PostDatabase(), new TokenManager_1.TokenManager()));
exports.comentsRouter.get("/", comentsController.getComents);
exports.comentsRouter.post("/", comentsController.newComent);
exports.comentsRouter.put("/:comentId", comentsController.updateComent);
exports.comentsRouter.delete("/:comentId", comentsController.deleteComent);
//# sourceMappingURL=ComentsRouter.js.map