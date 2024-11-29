import { Thread, ThreadType } from "@/database/repository/Thread";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class FetchThreadById implements Action<ThreadType>{
    constructor(private threadId:string){}

    async execute (): Promise<ThreadType> {
        try{
            const thread = await Thread.FetchThreadById(this.threadId);
            return thread;
        }catch(error:any){
            logger.error("Error fetching thread by id:", error);
            return {} as ThreadType;
        }
    }
}