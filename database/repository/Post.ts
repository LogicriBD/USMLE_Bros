import { addDoc, collection } from "firebase/firestore";
import { ApiError } from "next/dist/server/api-utils";
import { firestore } from "../config/firebaseApp";

export type PostType = {
    id?: string;
    userId:string;
    userName:string;
    threadId:string;
    content:string;
}

class PostRepository{
    async CreatePost(post:PostType){
        try{
            await addDoc(
                collection(firestore, "posts"),
                {
                    ...post
                }
            );
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }
}

export const Post = new PostRepository();