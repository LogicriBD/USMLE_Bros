import { auth, firestore } from "@/database/config/adminApp";
import { logger } from "@/utils/Logger";
import { NextRequest, NextResponse } from "next/server";

let sessionRef;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const accessToken = formData.get("accessToken") as string;
    if (accessToken === "undefined" || !accessToken) {
      await updateSessionStatus(false);
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    sessionRef = firestore
      .collection("sessions")
      .where("accessToken", "==", accessToken);
    let sessionSnapshot = await sessionRef.get();
    const decodedToken = await auth.verifyIdToken(accessToken);
    const type = formData.get("type") as string;

    const email = decodedToken.email;
    if (sessionSnapshot.empty) {
      await firestore.collection("sessions").add({
        accessToken,
        email,
        active: true,
        createdAt: new Date(),
      });
      sessionRef = firestore
        .collection("sessions")
        .where("accessToken", "==", accessToken);
      sessionSnapshot = await sessionRef.get();
    }

    if (type === "verification") {
      return NextResponse.json({
        success: true,
        email: decodedToken.email,
        message: "Token verified",
      });
    }
    const user = firestore.collection("users").where("email", "==", email);
    const userSnapshot = await user.get();
    if (userSnapshot.empty) {
      await updateSessionStatus(false);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();
    return NextResponse.json({
      role: userData.role,
      email: userData.email,
    });
  } catch (error: any) {
    logger.error(error);
    await updateSessionStatus(false);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function updateSessionStatus(status: boolean) {
  if (sessionRef) {
    const sessionSnapshot = await sessionRef.get();
    if (!sessionSnapshot.empty) {
      const sessionDoc = sessionSnapshot.docs[0];
      await sessionDoc.ref.update({ active: status });
    }
  }
}
