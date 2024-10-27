import { Content, ContentMetaData } from "@/database/repository/Content";
import { Action } from "@/types/Action";
import { ApiError } from "next/dist/server/api-utils";

export class ContentFetchAll implements Action<ContentMetaData[]> {
    async execute(): Promise<ContentMetaData[]> {
        try{
            const contents: ContentMetaData[] = await Content.fetchAllMetadata();
            return contents;
        }catch(error:any){
            console.error(error);
            throw new ApiError(400, error.message);
        }
    }
}