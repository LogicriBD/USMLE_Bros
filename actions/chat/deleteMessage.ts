import { Chat } from "@/database/repository/Chat";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class DeleteMessage implements Action<void> {
    constructor(private payload: { messageId: string }) {}

    async execute(): Promise<void> {
        try{
            await Chat.deleteMessage(this.payload.messageId);
        }catch(error: any){
            logger.error(error);
        }
    }
}