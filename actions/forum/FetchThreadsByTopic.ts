import { Thread, ThreadType } from "@/database/repository/Thread";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class FetchThreadsByTopicId implements Action<ThreadType[]>{
    constructor(private payload:{topicId:string}){}

    async execute(): Promise<ThreadType[]> {
        try{
            const threads = await Thread.fetchThreadsByTopicId(this.payload.topicId);
            return threads;
        }catch(error:any){
            logger.error("Error fetching threads by topic:", error);
            return [] as ThreadType[];
        }
    }
}