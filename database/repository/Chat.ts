import { ReceiveMessage, SendMessage } from "@/types/Message";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { ApiError } from "next/dist/server/api-utils";
import { firestore } from "../config/firebaseApp";
class ChatRepository {
    async sendMessage(message: SendMessage) {
        try {
            await addDoc(
                collection(firestore, "messages"),
                {
                    ...message,
                }
            )
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    fetchMessages(callback) {
        const messageCollectionRef = collection(firestore, "messages");
        const messagesQuery = query(messageCollectionRef, orderBy('time', 'desc'));

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const newMessages: ReceiveMessage[] = snapshot.docs.map((doc) => {
                const docData = doc.data() as SendMessage;

                return {
                    id: doc.id,
                    ...docData,
                };
            });

            callback(newMessages);
        });


        return unsubscribe;
    }

    async deleteMessage(messageId: string) {
        try {
            const messageRef = doc(firestore, "messages", messageId);
            await deleteDoc(messageRef);
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }
}

export const Chat = new ChatRepository(); 