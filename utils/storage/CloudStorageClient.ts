import { StorageService } from "@/types/StorageService";
import { Storage, Bucket } from "@google-cloud/storage";
import { UploadApiResponse } from "cloudinary";
import { ApiError } from "next/dist/server/api-utils";
import path from "path";
import { v4 as uuidv4 } from "uuid";

class CloudStorageService implements StorageService {
  private storage: Storage;
  private bucket: Bucket;

  constructor() {
    this.storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT_ID,
      keyFilename: path.join(__dirname, "./secret-key.json"),
    });
    const bucketName = process.env.GCLOUD_STORAGE_BUCKET!;
    this.bucket = this.storage.bucket(bucketName);
  }

  /**
   * Upload file to Firebase Storage
   * @param {File} file - The file to upload
   * @returns {Promise<object>} - The Firebase Storage upload result
   */
  async upload(
    file: File
  ): Promise<Pick<UploadApiResponse, "url" | "public_id"> | undefined> {
    const streamResponse: Promise<Pick<
      UploadApiResponse,
      "url" | "public_id"
    > | null> = new Promise((resolve, reject) => {
      file
        .arrayBuffer()
        .then((arrayBuffer) => {
          const fileBuffer = Buffer.from(arrayBuffer);
          const fileExtension = path.extname(file.name);
          const uniqueFileName = `${uuidv4()}${fileExtension}`;

          const blob = this.bucket.file(uniqueFileName);

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
                await blob.acl.add({
                  entity: "allUsers",
                  role: Storage.acl.READER_ROLE,
                });
                const [url] = await blob.getSignedUrl({
                  action: "read",
                  expires: "03-01-2999",
                });
                const fileKey = url
                  .split(
                    `https://storage.googleapis.com/${process.env
                      .GCLOUD_STORAGE_BUCKET!}/`
                  )[1]
                  .split("?")[0];
                resolve({
                  public_id: fileKey,
                  url,
                });
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
    });
    const response = await streamResponse;
    if (!response) {
      throw new ApiError(500, "Failed to upload file");
    }
    return response;
  }

  getUrlByFileKey(fileKey: string): string {
    const bucketName = process.env.GCLOUD_STORAGE_BUCKET;
    return `https://storage.googleapis.com/${bucketName}/${fileKey}`;
  }
}

export const CloudStorageClient = new CloudStorageService();
