import { Post, PostType } from "@/database/repository/Post";
import { Action } from "@/types/Action";

export class FetchPosts implements Action<PostType[]> {
    constructor(private threadId: string) {}

    async execute(): Promise<PostType[]> {
        try{
            const posts = await Post.FetchPostsByThreadId(this.threadId);
            return posts;
        }catch(error:any){
            console.error("Error fetching posts:", error);
            return [];
        }
    }
}