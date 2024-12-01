import { User, UserData } from "@/database/repository/User";
import { Action } from "@/types/Action";
import { ApiError } from "next/dist/server/api-utils";

export class SendNewsLetter implements Action<void> {
    constructor(private subject: string, private receiver: string, private content: string) {}

    async execute() : Promise<void>{
        const users = await this.fetchUsers();
    }

    async fetchUsers(): Promise<UserData[]> {
        try{
            let users: UserData[] = [];
            if(this.receiver === "All"){
                users = await User.findAllUsers();
            }else{
                users = await User.findUsersByRole(this.receiver);
            }

            return users;
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }
}