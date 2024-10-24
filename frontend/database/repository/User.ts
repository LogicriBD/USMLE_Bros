import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
      const q = query(collection(firestore, "users"), where("email", "==", email));
  
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        throw new ApiError(404, `User not found for email: ${email}`);
      }
  
      const userDoc = querySnapshot.docs[0];
      
      return { id: userDoc.id, ...userDoc.data() } as UserData;
    } catch (error: any) {
      console.error(error);
      throw new ApiError(400, error.message || "Failed to fetch user by email");
    }
  }

  async findAllUsers(): Promise<UserData[]> {
    try {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const users: UserData[] = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() } as UserData);
      });
      return users;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }

  async deleteUser(id: string) {
    try {
      const userRef = doc(firestore, "users", id);
      await deleteDoc(userRef);
      console.log("User deleted successfully");
    } catch (error: any) {
      console.error("Error deleting user:", error);
      throw new ApiError(400, error.message);
    }
  }

  async updateUserRole(id: string, role: Roles) {
    try {
      const userRef = doc(firestore, "users", id);
      await updateDoc(userRef, {
        role: role,
      });
    } catch (error: any) {
      console.error("Error updating user role:", error);
      throw new ApiError(400, error.message);
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
