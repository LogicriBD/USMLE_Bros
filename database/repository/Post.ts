import { Timestamp, addDoc, arrayUnion, collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { ApiError } from "next/dist/server/api-utils";
import { firestore } from "../config/firebaseApp";

export type PostType = {
    id?: string;
    userId: string;
    userName: string;
    threadId: string;
    content: string;
    createdAt: Date;
    comments?: CommentType[];
}

export type CommentType = {
    id?: string;
    userId: string;
    userName: string;
    postId: string;
    content: string;
    createdAt: Date;
}

class PostRepository {
    async CreatePost(post: PostType) {
        try {
            await addDoc(
                collection(firestore, "posts"),
                {
                    ...post
                }
            );
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    FetchPostsByThreadId(threadId: string, callback) {
        try {
            const postQueryRef = collection(firestore, "posts");
            const postquery = query(
                postQueryRef,
                where("threadId", "==", threadId),
                orderBy("createdAt", "desc")
            )

            const unsubscribe = onSnapshot(postquery, (snapshot) => {
                if (!snapshot.empty) {
                    const newPosts: PostType[] = snapshot.docs.map((doc) => {
                        const docData = doc.data() as PostType;
                        return {
                            id: doc.id,
                            ...docData
                        }
                    });

                    callback(newPosts);
                } else {
                    callback([]);
                }
            });
            return unsubscribe;
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async addCommentsToPost(postId: string, comment: CommentType) {
        try {
            const postRef = doc(firestore, "posts", postId);

            const newComment: CommentType = {
                id: crypto.randomUUID(),
                userId: comment.userId,
                userName: comment.userName,
                postId: postId,
                content: comment.content,
                createdAt: Timestamp.now().toDate(),
            };

            await updateDoc(postRef, {
                comments: arrayUnion(newComment),
            });
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }
}

export const Post = new PostRepository();