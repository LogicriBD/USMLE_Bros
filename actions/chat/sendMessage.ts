import { Chat } from "@/database/repository/Chat";
import { Action } from "@/types/Action";
import { SendMessage } from "@/types/Message";
import { logger } from "@/utils/Logger";

export class sendMessage implements Action<void>{
    constructor(private payload: {message: SendMessage}){}

    async execute(): Promise<void>{
        try{
            await Chat.sendMessage(this.payload.message);
        }catch(error:any){
            logger.error(error);
        }
    }
}