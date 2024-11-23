import { BlogMetadata, BlogRepo } from "@/database/repository/Blog";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class FetchBlogMetadataById implements Action<BlogMetadata> {
    constructor(private payload: {id:string}) {}

    async execute(): Promise<BlogMetadata> {
        try{
            const blogMetadata: BlogMetadata = await BlogRepo.fetchMetadataById(this.payload.id);
            return blogMetadata;
        }catch(error){
            logger.error(error);
            return {} as BlogMetadata;
        }
    }
}