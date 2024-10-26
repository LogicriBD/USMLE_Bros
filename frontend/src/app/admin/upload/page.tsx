"use client"
import { CategoryFetchAll } from "@/actions/category/CategoryFetchAll";
import { CategoryData } from "@/database/repository/Category";
import SideBar from "@/src/components/Upload/SideBar";
import Uploader from "@/src/components/Upload/Uploader";
import AuthStateManager from "@/src/context/AuthStateManager"
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { categoryActions } from "@/src/context/store/slices/category-slice";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { withAdminPriviledges } from "@/src/hoc/withAdminPrivileges";
import { useEffect, useState } from "react";

const UploadPage = () => {

    const [categories, setCategories] = useState<CategoryData[]>([]);
    const dispatch = useAppDispatch();
    const selectedCategory = useAppSelector((state) => state.category.selectedCategory);
    const modal = useAppSelector((state) => state.modal.type);

    const fetchCategories = async () => {
        try {
            dispatch(loaderActions.turnOn());
            const categoryAction = await new CategoryFetchAll();
            const categories = await categoryAction.execute();
            setCategories(categories);
            if (categories.length > 0) {
                dispatch(categoryActions.setCategories(categories));
                if (selectedCategory === null) {
                    dispatch(categoryActions.setSelectedCategory(categories[0]));
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(loaderActions.turnOff());
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [modal]);

    return (
        <AuthStateManager>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-64 w-full">
                    <SideBar categories={categories} />
                </div>
                <div className="flex-1">
                    <Uploader />
                </div>
            </div>
        </AuthStateManager>

    )
}

export default withAdminPriviledges(UploadPage);