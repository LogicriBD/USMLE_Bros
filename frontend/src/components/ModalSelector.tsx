"use client";
import { ModalName } from "@/utils/enums/ModalEnum";
import React from "react";
import CategoriesModal from "./Modals/CategoriesModal";
import AuthModal from "./Modals/AuthModal";
import SignUpModal from "./Modals/SignUpModal";
import { useAppSelector } from "../context/store/hooks";
import SwitchRoleModal from "./Modals/UsersActions/SwitchRoleModal";
import DeleteUser from "./Modals/UsersActions/DeleteUser";
import CreateCategory from "./Modals/Content/CreateCategory";

const ModalSelector = () =>
{

    const currentSelectedModal = useAppSelector((state) => state.modal.type);

    return (
        <>
            <React.Fragment>
                {currentSelectedModal === ModalName.Categories && <CategoriesModal />}
                {currentSelectedModal === ModalName.Login && <AuthModal />}
                {currentSelectedModal === ModalName.SignUp && <SignUpModal />}
                {currentSelectedModal === ModalName.SwitchRole && <SwitchRoleModal />}
                {currentSelectedModal === ModalName.DeleteUser && <DeleteUser />}
                {currentSelectedModal === ModalName.CreateCategory && <CreateCategory />}
            </React.Fragment>
        </>
    )
}

export default ModalSelector;