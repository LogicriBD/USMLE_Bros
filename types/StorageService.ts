import { UploadApiResponse } from "cloudinary";

export interface StorageService {
  upload(
    file: File
  ): Promise<Pick<UploadApiResponse, "url" | "public_id"> | undefined>;
  getUrlByFileKey(fileKey: string): string;
}
