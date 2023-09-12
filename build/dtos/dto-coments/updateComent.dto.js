"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComentSchema = void 0;
const zod_1 = require("zod");
exports.UpdateComentSchema = zod_1.z.object({
    id: zod_1.z.string().min(1),
    token: zod_1.z.string().min(1),
    content: zod_1.z.string().min(1).optional()
}).transform(data => data);
//# sourceMappingURL=updateComent.dto.js.map