import { BlogType } from "@/utils/enums/Blog";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
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
        try {
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
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async fetchAllMetadataByCategory(category: BlogType): Promise<BlogMetadata[]> {
        const q = query(
            collection(firestore, "blogmetadata"),
            where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);
        let metadata: BlogMetadata[] = [];
        querySnapshot.forEach((doc) => {
            metadata.push({ id: doc.id, ...doc.data() } as BlogMetadata);
        });
        return metadata;
    }

    async fetchBlogByMetadataId(id: string) : Promise<BlogData>{
        try{
            const q = query(
                collection(firestore, "blog"),
                where("metadataId", "==", id)
            );

            const querySnapshot = await getDocs(q);
            let blog:BlogData[] = [];
            querySnapshot.forEach((doc) => {
                blog.push({id: doc.id, ...doc.data()} as BlogData);
            });
            return blog[0];
        }catch(error:any){
            throw new ApiError(400, error.message);
        }
    }

    async fetchMetadataById(id: string): Promise<BlogMetadata> {
        try {
            const docRef = doc(firestore, "blogmetadata", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as BlogMetadata;
            } else {
                throw new ApiError(404, "Blog not found");
            }
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }
}

export const BlogRepo = new BlogRepository();