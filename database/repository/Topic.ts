import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebaseApp";
import { ApiError } from "next/dist/server/api-utils";

export type TopicType = {
    id?:string
    title:string;
    parentId:string;
    level:number;
    description:string;
}

class TopicRepository{
    async createTopic(topic:TopicType):Promise<void>{
        try{
            await addDoc(
                collection(firestore, "topics"),
                {
                    ...topic
                }
            );
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }

    async fetchAllTopics(){
        try{
            const querySnapshot = await getDocs(
                collection(firestore, "topics")
            );
            const topics:TopicType[] = [];
            querySnapshot.forEach((doc) => {
                topics.push({id: doc.id, ...doc.data()} as TopicType);
            });
            return topics;
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }
}

export const Topic = new TopicRepository();