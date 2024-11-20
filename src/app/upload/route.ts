import { StorageService } from "@/utils/Cloudinary";
import { logger } from "@/utils/Logger";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const uploadResult = await StorageService.upload(file);
    if (!uploadResult) {
      return NextResponse.json(
        { success: false, error: "Failed to upload file" },
        { status: 500 }
      );
    }
    const fileUrl = StorageService.getUrlByFileKey(uploadResult.public_id);

    return NextResponse.json({ success: true, file: { url: fileUrl } });
  } catch (error: any) {
    logger.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
