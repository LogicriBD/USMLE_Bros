import { User } from "@/database/repository/User";
import { Action } from "@/types/Action";
import { logger } from "@/utils/Logger";
import { BanEnum } from "@/utils/enums/Ban";

export class BanUser implements Action<void>{
    constructor(private id: string, private duration: BanEnum) {}
    async execute(): Promise<void> {
        try{
            await User.BanUser(this.id, this.duration);
        }catch(error: any){
            logger.error(error);
        }
    }
}