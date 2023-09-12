export interface PostDB {
  id: string,
  creator_id: string,
  content: string,
  likes: number,
  dislikes: number,
  coments: number,
  created_at: string,
  updated_at: string
}

export interface PostDBPlusCreatorName {
  id: string,
  creator_id: string,
  content: string,
  likes: number,
  dislikes: number,
  coments: number,
  created_at: string,
  updated_at: string,
  creator_name: string
}


export interface PostModel {
  id: string,
  content: string,
  likes: number,
  dislikes: number,
  coments: number,
  createdAt: string,
  updatedAt: string,
  creator: {
    id: string,
    name: string
  }
}

export class Post {
  constructor(
    private id: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private coments: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorId: string,
    private creatorName: string
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

  public getLikes(): number {
    return this.likes;
  }

  public addLike(): void {
    this.likes++
  }
  
  public removeLike(): void {
    this.likes--
  }

  public getDislikes(): number {
    return this.dislikes;
  }

  public addDislike(): void {
    this.dislikes++
  }
  
  public removeDislike(): void {
    this.dislikes--
  }

  public getComents(): number {
    return this.coments;
  }

  public addComent(): void {
    this.coments++
  }
  
  public removeComent(): void {
    this.coments--
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }

  public getCreatorId(): string {
    return this.creatorId;
  }

  public getCreatorName(): string {
    return this.creatorName
  }

  public postToDB(): PostDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      coments: this.coments,
      created_at: this.createdAt,
      updated_at: this.updatedAt
    }
  }

  public postToBusiness(): PostModel {
    return {
      id: this.id,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      coments: this.coments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      creator: {
        id: this.creatorId,
        name: this.creatorName
      }
    }
  }
}