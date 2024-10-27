import { Content } from "@/database/repository/Content";
import { Action } from "@/types/Action";
import { ApiError } from "next/dist/server/api-utils";

export class ContentCreate implements Action<void>{
    constructor(private payload:{content: Content}){}
    async execute(): Promise<void> {
        try{
            await Content.createContent(this.payload.content); 
        }catch(error: any){
            console.error(error);
            throw new ApiError(400, error.message);
        }
    }
}