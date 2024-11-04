"use client";
import { ModalName } from "@/utils/enums/ModalEnum";
import React from "react";
import CategoriesModal from "./Modals/CategoriesModal";
import { useAppSelector } from "../context/store/hooks";
import SwitchRoleModal from "./Modals/UsersActions/SwitchRoleModal";
import DeleteUser from "./Modals/UsersActions/DeleteUser";
import CreateCategory from "./Modals/Content/CreateCategory";
import CreateContent from "./Modals/Content/CreateContent";
import ErrorModal from "./Modals/ErrorModal";
import SuccessModal from "./Modals/SuccessModal";
import ContentLock from "./Modals/Content/ContentLock";

const ModalSelector = () =>
{

    const currentSelectedModal = useAppSelector((state) => state.modal.type);

    return (
        <>
            <React.Fragment>
                {currentSelectedModal === ModalName.Categories && <CategoriesModal />}
                {currentSelectedModal === ModalName.SwitchRole && <SwitchRoleModal />}
                {currentSelectedModal === ModalName.DeleteUser && <DeleteUser />}
                {currentSelectedModal === ModalName.CreateCategory && <CreateCategory />}
                {currentSelectedModal === ModalName.CreateContent && <CreateContent />}
                {currentSelectedModal === ModalName.ErrorModal && <ErrorModal />}
                {currentSelectedModal === ModalName.SuccessModal && <SuccessModal />}
                {currentSelectedModal === ModalName.ContentLock && <ContentLock />}
            </React.Fragment>
        </>
    )
}

export default ModalSelector;