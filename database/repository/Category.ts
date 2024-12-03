import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../config/firebaseApp";
import { ApiError } from "next/dist/server/api-utils";
export type CategoryData = {
  id: string;
  name: string;
  stepId: string;
};

export type StepData = {
  id: string;
  name: string;
};
class CategoryRepository {
  async createStep(name: string) {
    try {
      await addDoc(collection(firestore, "steps"), { name: name });
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }

  async countAllSteps() {
    try {
      const querySnapshot = await query(collection(firestore, "steps"));
      const docs = await getDocs(querySnapshot);
      return docs.size;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }

  async findAllSteps() {
    try {
      const querySnapshot = await getDocs(collection(firestore, "steps"));
      const steps: StepData[] = [];
      querySnapshot.forEach((doc) => {
        steps.push({ id: doc.id, ...doc.data() } as StepData);
      });
      return steps;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }

  async createCategory(name: string, id: string) {
    try {
      await addDoc(collection(firestore, "categories"), {
        name: name,
        stepId: id,
      });
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }

  async findByStepId(stepId: string) {
    try {
      const docs = await getDocs(
        query(
          collection(firestore, "categories"),
          where("stepId", "==", stepId)
        )
      );
      const categories: CategoryData[] = [];
      docs.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() } as CategoryData);
      });
      return categories;
    } catch (error: any) {
      throw new ApiError(400, error.message);
    }
  }
}

export const Category = new CategoryRepository();
