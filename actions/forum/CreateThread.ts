import { Thread, ThreadType } from "@/database/repository/Thread";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class CreateThread implements Action<void>{
    constructor(private payload:{thread:ThreadType}){}

    async execute(): Promise<void> {
        try{
            await Thread.createThread(this.payload.thread);
        }catch(error){
            logger.error("Error creating thread:", error);
        }    
    }
}