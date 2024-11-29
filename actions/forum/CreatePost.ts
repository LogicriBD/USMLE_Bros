import { Post, PostType } from "@/database/repository/Post";
import { Thread } from "@/database/repository/Thread";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class CreatePost implements Action<void>{
    constructor (private post:PostType){}

    async execute(): Promise<void> {
        try{
            await Post.CreatePost(this.post);
            await Thread.updateThreadTimestamp(this.post.threadId, this.post.createdAt);
        }catch(error:any){
            logger.error("Error creating post: ", error);
        }
    }
}