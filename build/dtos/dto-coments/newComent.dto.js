"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewComentSchema = void 0;
const zod_1 = require("zod");
exports.NewComentSchema = zod_1.z.object({
    postId: zod_1.z.string().min(1),
    token: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1)
}).transform(data => data);
//# sourceMappingURL=newComent.dto.js.map