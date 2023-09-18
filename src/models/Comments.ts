export interface CommentsDB {
    id: string,
    post_id: string,
    user_id: string,
    content: string,
    created_at: string,
    updated_at: string
}

export interface CommentsDBPlusCreatorName {
    id: string,
    post_id: string,
    user_id: string,
    content: string,
    created_at: string,
    updated_at: string,
    creator_name: string
}

export interface CommentsModel {
    id: string,
    postId: string;
    content: string,
    createdAt: string,
    updatedAt: string,
    creator: {
      id: string,
      name: string
    }
  }
  

export class Comments {
    constructor(
        private id: string,
        private postId: string,
        private userId: string,
        private creatorName: string,
        private content: string,
        private createdAt: string,
        private updatedAt: string,
    ) { }

    public getId(): string {
        return this.id;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(content: string): void {
        this.content = content
    }

    public getCreatedAt(): string {
        return this.createdAt;
    }

    public getUpdatedAt(): string {
        return this.updatedAt;
    }

    public getCreatorName(): string {
        return this.creatorName
    }

    public commentsToDB(): CommentsDB {
        return {
            id: this.id,
            post_id: this.postId,
            user_id: this.userId,
            content: this.content,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }

    public commentsToBusiness(): CommentsModel {
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
        }
    }
}