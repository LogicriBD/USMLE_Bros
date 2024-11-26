import { Topic, TopicType } from "@/database/repository/Topic";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class CreateTopic implements Action<void> {
    constructor(private payload: {topic: TopicType}){}

    async execute(){
        try{
            await Topic.createTopic(this.payload.topic);
        }catch(error:any){
            logger.error(error);
        }
    }
}