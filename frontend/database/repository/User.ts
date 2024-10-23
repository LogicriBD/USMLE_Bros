import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../config/firebaseApp";
import { Roles } from "@/utils/enums/Roles";
import { ApiError } from "next/dist/server/api-utils";

export type UserData = {
  id: string;
  email: string;
  name: string;
  role: Roles;
};

class UserImpl {
  async findUserById(id: string): Promise<UserData> {
    try {
      const userRef = doc(firestore, "users", id);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        return { id: userSnapshot.id, ...userSnapshot.data() } as UserData;
      } else {
        throw Error(`User not found for id: ${id}`);
      }
    } catch (error: any) {
      throw new ApiError(404, error.message);
    }
  }

  async findUserByEmail(email: string): Promise<UserData> {
    try {
      const userRef = doc(firestore, "users", email);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        return { id: userSnapshot.id, ...userSnapshot.data() } as UserData;
      } else {
        throw Error(`User not found for email: ${email}`);
      }
    } catch (error: any) {
      throw new ApiError(404, error.message);
    }
  }

  async createGeneralUser(email: string, name: string) {
    try {
      const docRef = await addDoc(collection(firestore, "users"), {
        email: email,
        name: name,
        role: Roles.User,
      });
      return docRef;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }

  async createAdminUser(email: string, name: string) {
    try {
      const docRef = await addDoc(collection(firestore, "users"), {
        email: email,
        name: name,
        role: Roles.Admin,
      });
      return docRef;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
}

export const User = new UserImpl();
