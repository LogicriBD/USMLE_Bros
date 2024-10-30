import { auth, firestore } from "@/database/config/adminApp";
import { logger } from "@/utils/Logger";
import { ServerAuthContext } from "@/utils/ServerAuthContext";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    logger.log(process.env.NEXT_FIREBASE_PRIVATE_KEY);
    const formData = await request.formData();
    const accessToken = formData.get("accessToken") as string;
    if (accessToken === "undefined") {
      ServerAuthContext.setLoggedIn(false);
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }
    const decodedToken = await auth.verifyIdToken(accessToken);
    ServerAuthContext.setLoggedIn(true);
    const email = decodedToken.email;
    const user = firestore.collection("users").where("email", "==", email);
    const userSnapshot = await user.get();
    if (userSnapshot.empty) {
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
