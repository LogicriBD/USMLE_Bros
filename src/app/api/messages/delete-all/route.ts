import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/database/config/adminApp";

export async function POST(req: NextRequest) {
  try {
    const headers = req.headers;
    const cronSecret = headers.get("Cron-Secret");
    if (cronSecret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const messagesRef = firestore.collection("messages");
    const batchSize = 500;
    let documents = await messagesRef.limit(batchSize).get();

    while (!documents.empty) {
      const batch = firestore.batch();
      documents.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      documents = await messagesRef.limit(batchSize).get();
    }

    return NextResponse.json("All messages deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting messages:", error);
    return NextResponse.json(
      { error: "Failed to delete messages" },
      { status: 500 }
    );
  }
}
