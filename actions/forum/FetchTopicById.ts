import { Topic, TopicType } from "@/database/repository/Topic";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class FetchTopicById implements Action<TopicType>{
    constructor(private id: string) {}
    async execute(): Promise<TopicType> {
        try{
            return await Topic.fetchTopicById(this.id);
        }catch(error:any){
            logger.error("Error fetching topic:", error);
            return {} as TopicType;
        }
    }
}