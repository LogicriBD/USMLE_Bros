import { bucket } from "@/database/config/adminApp";
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

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);
    const fileName = `uploads/${Date.now()}-${file.name}`;
    const bucketFile = bucket.file(fileName);

    await bucketFile.save(fileBuffer, {
      metadata: { contentType: file.type },
    });

    const [url] = await bucketFile.getSignedUrl({
      action: "read",
      expires: "03-09-2491",
    });

    return NextResponse.json({ success: true, file: { url } });
  } catch (error: any) {
    logger.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
