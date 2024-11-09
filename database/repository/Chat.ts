import { SendMessage } from "@/types/Message";
import { realtimeDatabase } from "../config/firebaseApp";
import { push, ref } from "firebase/database";
import { ApiError } from "next/dist/server/api-utils";
class ChatRepository {
    async sendMessage(message: SendMessage) {
        try {
            const messageRef = ref(realtimeDatabase, "messages");
            await push(messageRef, message);
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }
}

export const Chat = new ChatRepository(); 