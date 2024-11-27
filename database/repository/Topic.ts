import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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

    async fetchTopicAndSubTopicsById(id:string){
        try{
            const topicRef = doc(firestore, "topics", id);
            const topicSnapshot = await getDoc(topicRef);
            const topic = topicSnapshot.exists() ? { id: topicSnapshot.id, ...topicSnapshot.data() } as TopicType : null; 
            
            if (!topic) {
                throw new Error(`Topic with id ${id} not found`);
            }

            const q = query(
                collection(firestore, "topics"),
                where("parentId", "==", id)
            )

            const querySnapshot = await getDocs(q);
            const subTopics:TopicType[] = [];
            querySnapshot.forEach((doc) => {
                subTopics.push({id: doc.id, ...doc.data()} as TopicType);
            });

            return {topic, subTopics};
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }

    async fetchTopicById(id:string){
        try{
            const topicRef = doc(firestore, "topics", id);
            const topicSnapshot = await getDoc(topicRef);
            return { id: topicSnapshot.id, ...topicSnapshot.data() } as TopicType;
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }
}

export const Topic = new TopicRepository();