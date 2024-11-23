import { BlogMetadata, BlogRepo } from "@/database/repository/Blog";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { BlogType } from "@/utils/enums/Blog";

export class FetchBlogsByCategory implements Action<BlogMetadata[]> {
    private category: BlogType;

    constructor(category: BlogType) {
        this.category = category;
    }

    public async execute(): Promise<BlogMetadata[]> {
        try{
            const blogs: BlogMetadata[] = await BlogRepo.fetchAllMetadataByCategory(this.category);
            return blogs;
        }catch(error: any){
            logger.error(error);
            return [];
        }
    }
}