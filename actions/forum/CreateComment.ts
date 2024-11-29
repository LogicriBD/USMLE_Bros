import { CommentType, Post } from "@/database/repository/Post";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class CreateComment implements Action<void> {
    constructor(private postId: string, private comment: CommentType) {}

    async execute():Promise<void> {
        try{
            await Post.addCommentsToPost(this.postId, this.comment);
        }catch(error:any){
            logger.error(error);
        }
    }
} 