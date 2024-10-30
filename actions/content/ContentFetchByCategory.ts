import { Content, ContentMetaData } from "@/database/repository/Content";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class ContentFetchByCategory implements Action<ContentMetaData[]> {
    constructor(private payload: {categoryId: string}) {}

    async execute(): Promise<ContentMetaData[]> {
        try {
            const contents: ContentMetaData[] = await Content.fetchMetadataByCategory(
                this.payload.categoryId
            );
            return contents;
        } catch (error: any) {
            logger.error(error);
            return [];
        }
    }
}