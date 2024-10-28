import { Content, ContentData } from "@/database/repository/Content";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class ContentsFetchById implements Action<ContentData[]> {
    constructor(private payload: {metadataId: string}) {}

    async execute(): Promise<ContentData[]> {
        try {
            const contents = await Content.fetchContentsById(this.payload.metadataId);
            return contents;
        } catch (error: any) {
            logger.error(error);
            return [] as ContentData[];
        }
    }
}