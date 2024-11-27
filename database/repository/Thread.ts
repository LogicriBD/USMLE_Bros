import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebaseApp";
import { ApiError } from "next/dist/server/api-utils";

export type ThreadType = {
    id?:string
    title:string;
    topicId:string;
    description?:string;
    createdBy:string;
    createdAt:Date;
    updatedAt:Date;
    posts?:number;
}

class ThreadRepository{
    async createThread(thread:ThreadType) {
        try{
            await addDoc(
                collection(firestore, "threads"),
                {
                    ...thread
                }
            );
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }

    async fetchThreadsByTopicId(topicId:string){
        try{
            const querySnapshot = await getDocs(
                query(
                    collection(firestore, "threads"),
                    where("topicId", "==", topicId)
                )
            );
            const threads:ThreadType[] = [];
            querySnapshot.forEach((doc) => {
                threads.push({id: doc.id, ...doc.data()} as ThreadType);
            });
            return threads;
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }
}

export const Thread = new ThreadRepository();