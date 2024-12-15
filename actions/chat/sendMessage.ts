import { Chat } from "@/database/repository/Chat";
import { User, UserData } from "@/database/repository/User";
import { appStore } from "@/src/context/store/redux-store";
import { userActions } from "@/src/context/store/slices/user-slice";
import { Action } from "@/types/Action";
import { SendMessage } from "@/types/Message";
import { logger } from "@/utils/Logger";

export class sendMessage implements Action<void>{
    constructor(private payload: {message: SendMessage}){}

    async execute(): Promise<void>{
        try{
            const user:UserData = await User.findUserById(this.payload.message.userId);
            if(user.banExpiry && user.banExpiry.toDate() > new Date()){
                appStore.dispatch(userActions.setData(user));
                return;
            }
            await Chat.sendMessage(this.payload.message);
        }catch(error:any){
            logger.error(error);
        }
    }
}