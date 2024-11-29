import { Topic, TopicType } from "@/database/repository/Topic";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class FetchTopics implements Action<TopicType[]>{
    constructor(){}
    async execute(): Promise<TopicType[]> {
        try{
            const topics:TopicType[] = await Topic.fetchAllTopics();
            return topics;
        }catch(error:any){
            logger.error(error);
            return [] as TopicType[];
        }
    }
}