import { addDoc, collection, doc, getDoc, getDocs, increment, orderBy, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../config/firebaseApp";
import { ApiError } from "next/dist/server/api-utils";

export type ThreadType = {
    id?: string
    title: string;
    topicId: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    posts?: number;
}

class ThreadRepository {
    async createThread(thread: ThreadType) {
        try {
            await addDoc(
                collection(firestore, "threads"),
                {
                    ...thread
                }
            );
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async fetchThreadsByTopicId(topicId: string) {
        try {
            const querySnapshot = await getDocs(
                query(
                    collection(firestore, "threads"),
                    where("topicId", "==", topicId),
                    orderBy("createdAt", "desc")
                )
            );
            const threads: ThreadType[] = [];
            querySnapshot.forEach((doc) => {
                threads.push({ id: doc.id, ...doc.data() } as ThreadType);
            });
            return threads;
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async FetchThreadById(threadId: string) {
        try {
            const threadRef = doc(firestore, "threads", threadId);
            const threadDoc = await getDoc(threadRef);

            if (threadDoc.exists()) {
                return { id: threadDoc.id, ...threadDoc.data() } as ThreadType;
            } else {
                throw new ApiError(404, "Thread not found");
            }
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async updateThreadTimestamp(threadId: string, createdAt: Date) {

        try {
            const threadRef = doc(firestore, "threads", threadId);
            await updateDoc(threadRef, {
                updatedAt: createdAt,
            });
            console.log("Thread updated successfully!");
        } catch (error) {
            console.error("Error updating thread:", error);
        }

    }

    async updateThreadPosts(threadId: string) {
        try{
            const threadRef = doc(firestore, "threads", threadId);
            await updateDoc(threadRef, {
                posts: increment(1),
            });
        }catch(error: any){
            throw new ApiError(400, error.message);
        }
    }
}

export const Thread = new ThreadRepository();