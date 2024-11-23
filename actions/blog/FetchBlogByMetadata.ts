import { BlogData, BlogRepo } from "@/database/repository/Blog";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";

export class FetchBlogByMetadata implements Action<BlogData>{
    constructor(private payload:{id:string}){}

    async execute(): Promise<BlogData>{
        try{
            const blog = await BlogRepo.fetchBlogByMetadataId(this.payload.id);
            return blog;
        }catch(error:any){
            logger.log(error);
            return {} as BlogData;
        }
    }
}