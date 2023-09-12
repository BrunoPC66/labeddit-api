"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coments = void 0;
class Coments {
    constructor(id, postId, userId, creatorName, content, createdAt, updatedAt) {
        this.id = id;
        this.postId = postId;
        this.userId = userId;
        this.creatorName = creatorName;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    getId() {
        return this.id;
    }
    getContent() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getCreatorName() {
        return this.creatorName;
    }
    comentsToDB() {
        return {
            id: this.id,
            post_id: this.postId,
            user_id: this.userId,
            content: this.content,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
    comentsToBusiness() {
        return {
            id: this.id,
            postId: this.postId,
            content: this.content,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            creator: {
                id: this.userId,
                name: this.creatorName
            }
        };
    }
}
exports.Coments = Coments;
//# sourceMappingURL=Coments.js.map