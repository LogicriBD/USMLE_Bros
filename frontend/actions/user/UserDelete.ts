import { User } from "@/database/repository/User";
import { Action } from "@/types/Action";
import { ApiError } from "next/dist/server/api-utils";

export class UserDelete implements Action<void> {
    constructor(private payload: {id:string}) {}

    async execute(): Promise<void> {
        try{
            await User.deleteUser(this.payload.id);
        }catch(error: any){
            console.error(error);
            throw new ApiError(400, error.message);
        }
    }
}