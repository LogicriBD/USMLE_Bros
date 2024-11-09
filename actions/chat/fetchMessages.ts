import { Chat } from "@/database/repository/Chat";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class fetchMessages implements Action<() => Promise<void>>{
    constructor(private payload: {}){}

    async execute(): Promise<() => Promise<void>>{
        try{
            Chat.fetchMessages();
        }catch(error:any){
            logger.error(error);
        }
    }
}