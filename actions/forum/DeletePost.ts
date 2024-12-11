import { Post } from "@/database/repository/Post";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class DeletePost implements Action<void>{
    constructor(private postId: string | undefined) {}

    async execute(): Promise<void> {
        try{
            if(this.postId){
                await Post.deletePost(this.postId);
            }else{
                return;
            }
        }catch(error:any){
            logger.log(error);
        }
    }
}