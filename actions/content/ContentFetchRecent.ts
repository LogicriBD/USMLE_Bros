import { Content, ContentMetaData } from "@/database/repository/Content";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class ContentFetchRecent implements Action<ContentMetaData[]>{
    constructor(){}
    async execute(): Promise<ContentMetaData[]> {
        try{
            const contents = Content.fetchRecentMetadata();
            return contents;
        }catch(
            error: any
        ){
            logger.error(error);
            return [] as ContentMetaData[];
        }
    }
}