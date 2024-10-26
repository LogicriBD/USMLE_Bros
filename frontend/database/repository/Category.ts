import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebaseApp";
import { ApiError } from "next/dist/server/api-utils";
export type CategoryData = {
    id: string;
    name: string;
};
class CategoryRepository {
    async createCategory(name: string) {
        try {
            await addDoc(collection(firestore, "categories"), { name: name });
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }

    async findAllCategories() {
        try {
            const querySnapshot = await getDocs(collection(firestore, "categories"));
            const categories: CategoryData[] = [];
            querySnapshot.forEach((doc) => {
                categories.push({ id: doc.id, ...doc.data() } as CategoryData);
            });
            return categories;
        } catch (error: any) {
            throw new ApiError(400, error.message);
        }
    }
}

export const Category = new CategoryRepository();