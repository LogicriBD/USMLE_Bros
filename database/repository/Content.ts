import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../config/firebaseApp";
import { ApiError } from "next/dist/server/api-utils";
import { logger } from "@/utils/Logger";

export type ContentMetaData = {
  id?: string;
  title: string;
  categoryId: string;
  userName: string;
  createdAt: Date;
  userId: string;
  imageUrl?: string;
  sections?: string[];
};

export type ContentData = {
  id?: string;
  metadataId?: string;
  content: any;
  isLocked: boolean;
  serialNumber: number;
};

export type Content = {
  metadata: ContentMetaData;
  content: ContentData[];
};

class ContentRepository {
  async createContent(content: Content) {
    try {
      const metadataRef = await addDoc(
        collection(firestore, "contentmetadata"),
        {
          ...content.metadata,
        }
      );

      const metadataId = metadataRef.id;

      for (const c of content.content) {
        await addDoc(collection(firestore, "content"), {
          metadataId: metadataId,
          content: c.content,
          isLocked: c.isLocked,
          serialNumber: c.serialNumber,
        });
      }
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }

  async fetchAllMetadata() {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "contentmetadata")
      );
      const metadata: ContentMetaData[] = [];
      querySnapshot.forEach((doc) => {
        metadata.push({ id: doc.id, ...doc.data() } as ContentMetaData);
      });
      return metadata;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }

  async fetchMetadataByCategory(categoryId: string) {
    try {
      const q = query(
        collection(firestore, "contentmetadata"),
        where("categoryId", "==", categoryId)
      );

      const querySnapshot = await getDocs(q);
      const metadata: ContentMetaData[] = [];
      querySnapshot.forEach((doc) => {
        metadata.push({ id: doc.id, ...doc.data() } as ContentMetaData);
      });
      return metadata;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }

  async lockContentById(contentId: string) {
    try {
      const contentRef = doc(firestore, "content", contentId);
      const contentDoc = await getDoc(contentRef);

      if (!contentDoc.exists()) {
        throw new ApiError(404, `Content not found for id: ${contentId}`);
      }

      const currentLockStatus = contentDoc.data()?.isLocked;
      await updateDoc(contentRef, {
        isLocked: !currentLockStatus,
      });
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }

  async fetchMetadataById(id: string) {
    try {
      const metadataRef = doc(firestore, "contentmetadata", id);
      const metadataSnapshot = await getDoc(metadataRef);

      if (metadataSnapshot.exists()) {
        return {
          id: metadataSnapshot.id,
          ...metadataSnapshot.data(),
        } as ContentMetaData;
      } else {
        throw Error(`User not found for id: ${id}`);
      }
    } catch (err: any) {
      logger.error(err);
      throw new ApiError(400, err.message);
    }
  }

  async deleteContentAndMetadataById(metadataId: string) {
    try {
      const metadataRef = doc(firestore, "contentmetadata", metadataId);
      await deleteDoc(metadataRef);

      const contentQuery = query(
        collection(firestore, "content"),
        where("metadataId", "==", metadataId)
      );
      const querySnapshot = await getDocs(contentQuery);

      const deletePromises = querySnapshot.docs.map((contentDoc) =>
        deleteDoc(contentDoc.ref)
      );

      await Promise.all(deletePromises);
    } catch (err: any) {
      logger.error(err);
      throw new ApiError(400, err.message);
    }
  }

  async fetchContentsById(metadataId: string, all: boolean = false) {
    try {
      const q = all
        ? query(
            collection(firestore, "content"),
            where("metadataId", "==", metadataId)
          )
        : query(
            collection(firestore, "content"),
            where("metadataId", "==", metadataId),
            where("isLocked", "==", false)
          );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new ApiError(
          404,
          `Content not found for metadataId: ${metadataId}`
        );
      }

      const contentDocs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ContentData[];

      return contentDocs;
    } catch (error: any) {
      logger.error(error);
      throw new ApiError(400, error.message);
    }
  }
}
export const Content = new ContentRepository();
