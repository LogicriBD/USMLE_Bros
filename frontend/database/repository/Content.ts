import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebaseApp";
import { ApiError } from "next/dist/server/api-utils";

export type ContentMetaData = {
    id?: string;
    title: string;
    categoryId: string;
    userName: string;
    createdAt: Date;
}

export type ContentData = {
    id?: string;
    metedataId: string;
    content: any;
}

export type Content = {
    metadata: ContentMetaData,
    content: ContentData,
}

class ContentRepository {
    async createContent(content: Content) {
        try {
            const metadataRef = await addDoc(collection(firestore, "contentmetadata"), { 
                title: content.metadata.title,
                categoryId: content.metadata.categoryId,
                userName: content.metadata.userName,
                createdAt: content.metadata.createdAt,
            });

            const metadataId = metadataRef.id;
            await addDoc(collection(firestore, "content"), {
                metadataId: metadataId,
                content: content.content.content,
            })
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async fetchAllMetadata () {
        try{
            const querySnapshot = await getDocs(collection(firestore, "contentmetadata"));
            const metadata: ContentMetaData[] = [];
            querySnapshot.forEach((doc) => {
                metadata.push({ id: doc.id, ...doc.data() } as ContentMetaData);
            });
            return metadata;
        }catch(error: any){
            throw new ApiError(400, error.message);
        }
    }
    
    async fetchContentById(metadataId: string) {
        try{
            const q = query(collection(firestore, "content"), where(
                "metadataId", "==", metadataId
            ));

            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                throw new ApiError(404, `Content not found for metadataId: ${metadataId}`);
            }

            const contentDoc = querySnapshot.docs[0];

            return { id: contentDoc.id, ...contentDoc.data() } as ContentData;
        }catch(error: any){
            console.error(error);
            throw new ApiError(400, error.message);
        }
    }
}
export const Content = new ContentRepository();