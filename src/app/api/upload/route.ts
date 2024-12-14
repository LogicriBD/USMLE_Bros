import { StorageService } from "@/types/StorageService";
import { logger } from "@/utils/Logger";
import { CloudinaryClient } from "@/utils/storage/CloudinaryClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const storageService: StorageService = CloudinaryClient;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const uploadResult = await storageService.upload(file);
    if (!uploadResult) {
      return NextResponse.json(
        { success: false, error: "Failed to upload file" },
        { status: 500 }
      );
    }
    const fileUrl = storageService.getUrlByFileKey(uploadResult.public_id);

    return NextResponse.json({ success: true, file: { url: fileUrl } });
  } catch (error: any) {
    logger.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
