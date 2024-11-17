import { ReceiveMessage, SendMessage } from "@/types/Message";
import { DocumentData, QueryDocumentSnapshot, addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, startAfter } from "firebase/firestore";
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

    async fetchOldMessages(callback: (messages: ReceiveMessage[], lastVisible: QueryDocumentSnapshot<DocumentData> | null) => void,
        lastVisible: QueryDocumentSnapshot<DocumentData> | null) {
        const messageCollectionRef = collection(firestore, "messages");
        const messageQuery = lastVisible ?
            query(
                messageCollectionRef,
                orderBy("time", "desc"),
                startAfter(lastVisible),
                limit(10)
            ) :
            query(
                messageCollectionRef,
                orderBy("time", "desc"),
                limit(10)
            );

        const querySnapShot = await getDocs(messageQuery);
        if (!querySnapShot.empty) {
            const newLastVisible = querySnapShot.docs[querySnapShot.docs.length - 1];
            const newMessages: ReceiveMessage[] = querySnapShot.docs.map((doc) => {
                const docData = doc.data() as SendMessage;

                return {
                    id: doc.id,
                    ...docData,
                };
            });
            callback(newMessages, newLastVisible);
        }else{
            callback([], null);
        }
    }

    fetchNewMessages(callback: (messages: ReceiveMessage[]) => void) {
        const messageCollectionRef = collection(firestore, "messages");
        const messageQuery = query(
            messageCollectionRef,
            orderBy("time", "desc"),
            limit(20)
        );

        const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
            if (!snapshot.empty) {
                const newMessages: ReceiveMessage[] = snapshot.docs.map((doc) => {
                    const docData = doc.data() as SendMessage;

                    return {
                        id: doc.id,
                        ...docData,
                    };
                });

                callback(newMessages);
            }
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