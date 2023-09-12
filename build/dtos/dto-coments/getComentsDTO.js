"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComentsSchema = void 0;
const zod_1 = require("zod");
exports.GetComentsSchema = zod_1.z.object({
    q: zod_1.z.string().min(1).optional(),
    postId: zod_1.z.string().min(1),
    token: zod_1.z.string().min(1)
}).transform(data => data);
//# sourceMappingURL=getComentsDTO.js.map