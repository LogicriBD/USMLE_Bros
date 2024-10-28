import { Content } from "@/database/repository/Content";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class ContentLockById implements Action<void>{
    constructor(private payload: {contentId: string}) {}

    async execute(): Promise<void> {
        try{
            await Content.lockContentById(this.payload.contentId);
        }catch(error:any){
            logger.error(error);
        }
    }
}