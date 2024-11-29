import { addDoc, collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
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

    FetchPostsByThreadId(threadId:string, callback){
        try{

            const postquery = query(
                collection(firestore, "posts"),
                where("threadId", "==", threadId),
                orderBy("createdAt", "desc")
            )

            const unsubscribe = onSnapshot(postquery, (snapshot) => {
                if(!snapshot.empty){
                    const newPosts: PostType[] = snapshot.docs.map((doc) => {
                        const docData = doc.data() as PostType;
                        return {
                            id: doc.id,
                            ...docData
                        }
                    });

                    callback(newPosts)
                }
            })
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }
}

export const Post = new PostRepository();