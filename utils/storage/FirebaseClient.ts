import { ApiError } from "next/dist/server/api-utils";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { bucket } from "@/database/config/adminApp";
import { UploadApiResponse } from "cloudinary";
import { StorageService } from "@/types/StorageService";

class FirebaseStorageService implements StorageService {
  /**
   * Upload file to Firebase Storage
   * @param {File} file - The file to upload
   * @returns {Promise<object>} - The Firebase Storage upload result
   */
  async upload(
    file: File
  ): Promise<Pick<UploadApiResponse, "url" | "public_id"> | undefined> {
    const fileExtension = path.extname(file.name);
    const uniqueFileName = `${uuidv4()}${fileExtension}`;
    const streamResponse: Promise<string | null> = new Promise(
      (resolve, reject) => {
        file
          .arrayBuffer()
          .then((arrayBuffer) => {
            const fileBuffer = Buffer.from(arrayBuffer);
            const fileExtension = path.extname(file.name);
            const uniqueFileName = `${uuidv4()}${fileExtension}`;

            const blob = bucket.file(uniqueFileName);
            const blobStream = blob.createWriteStream({
              metadata: {
                contentType: file.type,
              },
            });

            blobStream
              .on("error", (error) => {
                reject(
                  new ApiError(
                    500,
                    `Firebase Storage upload failed: ${error.message}`
                  )
                );
              })
              .on("finish", async () => {
                try {
                  const [url] = await blob.getSignedUrl({
                    action: "read",
                    expires: "03-01-2999",
                  });
                  resolve(url);
                } catch (error: any) {
                  reject(
                    new ApiError(
                      500,
                      `Generating signed URL failed: ${error.message}`
                    )
                  );
                }
              });

            blobStream.end(fileBuffer);
          })
          .catch((error) => {
            reject(
              new ApiError(
                500,
                `File conversion to buffer failed: ${error.message}`
              )
            );
          });
      }
    );
    const url = await streamResponse;
    if (!url) {
      throw new ApiError(500, "Failed to upload file");
    }
    return {
      public_id: uniqueFileName,
      url,
    };
  }

  /**
   * Generate an optimized URL for a file stored in Firebase Storage
   * @param {string} fileKey - The file path in Firebase Storage
   * @returns {string} - The public URL
   */
  getUrlByFileKey = (fileKey: string) => {
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
      process.env.FIREBASE_STORAGE_BUCKET
    }/o/${encodeURIComponent(fileKey)}?alt=media`;
    return publicUrl;
  };
}

export const FirebaseClient = new FirebaseStorageService();
