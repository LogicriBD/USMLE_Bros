import { cloudinaryApp } from "@/database/config/cloudinaryApp";
import { StorageService } from "@/types/StorageService";
import { UploadApiResponse } from "cloudinary";
import { ApiError } from "next/dist/server/api-utils";

class CloudinaryStorageService implements StorageService {
  /**
   * Upload file to Cloudinary
   * @param {File} file - The file to upload
   * @returns {Promise<object>} - The Cloudinary upload result
   */
  /**
   * Upload file to Cloudinary
   * @param {File} file - The file to upload
   * @returns {Promise<object>} - The Cloudinary upload result
   */
  async upload(file: File): Promise<UploadApiResponse | undefined> {
    return new Promise((resolve, reject) => {
      file
        .arrayBuffer()
        .then((arrayBuffer) => {
          const fileBuffer = Buffer.from(arrayBuffer);

          const uploadStream = cloudinaryApp.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(
                  new ApiError(
                    500,
                    `Cloudinary upload failed: ${error.message}`
                  )
                );
              } else {
                resolve(result);
              }
            }
          );

          uploadStream.end(fileBuffer);
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
  }

  /**
   * Generate an optimized URL for a file stored in Cloudinary
   * @param {string} fileKey - The file public ID in Cloudinary
   * @returns {string} - The optimized URL
   */
  getUrlByFileKey = (fileKey: string) => {
    const optimizeUrl = cloudinaryApp.url(fileKey, {
      fetch_format: "auto",
      quality: "auto",
    });
    return optimizeUrl;
  };
}

export const CloudinaryClient = new CloudinaryStorageService();
