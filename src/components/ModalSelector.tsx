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
import BanModal from "./Modals/Chat/BanModal";
import CreateModal from "./Modals/forum/Create";

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
                {currentSelectedModal === ModalName.BanModal && <BanModal />}
                {currentSelectedModal === ModalName.CreateDiscussion && <CreateModal />}
            </React.Fragment>
        </>
    )
}

export default ModalSelector;