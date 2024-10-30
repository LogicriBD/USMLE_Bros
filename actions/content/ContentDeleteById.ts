import { Content } from "@/database/repository/Content";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class ContentDeleteById implements Action<void>{
    constructor(private payload: {id: string}) {}

    async execute(): Promise<void> {
        try{
            await Content.deleteContentAndMetadataById(this.payload.id);
        }catch(err: any){
            logger.error(err);
        }
    }
}