import { BlogType } from "@/utils/enums/Blog";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../config/firebaseApp";
import { ApiError } from "next/dist/server/api-utils";

export type BlogMetadata = {
    id?: string;
    title: string;
    category: BlogType;
    userName: string;
    createdAt: Date;
    userId: string;
    imageUrl: string;
}

export type BlogData = {
    id?: string;
    metadataId?: string;
    content: any;
}

export type Blog = {
    metadata: BlogMetadata;
    content: BlogData;
}

class BlogRepository {
    async createBlog(Blog: Blog) {
        try{
            const metadataRef = await addDoc(
                collection(firestore, "blogmetadata"),
                {
                    ...Blog.metadata,
                }
            );

            const metadataId = metadataRef.id;
            await addDoc(collection(firestore, "blog"), {
                metadataId: metadataId,
                content: Blog.content.content,
            });
        }catch(error: any){
            throw new ApiError(400, error.message);
        }
    }
}

export const BlogRepo = new BlogRepository();