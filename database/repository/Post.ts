import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { ApiError } from "next/dist/server/api-utils";
import { firestore } from "../config/firebaseApp";

export type PostType = {
    id?: string;
    userId:string;
    userName:string;
    threadId:string;
    content:string;
    createdAt:Date;
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

    async FetchPostsByThreadId(threadId:string){
        try{

            const q = query(
                collection(firestore, "posts"),
                where("threadId", "==", threadId)
            )

            const querySnapshot = await getDocs(q);
            const posts:PostType[] = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() } as PostType);
            });
            return posts;
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }
}

export const Post = new PostRepository();