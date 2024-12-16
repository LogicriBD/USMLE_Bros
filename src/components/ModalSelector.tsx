"use client";
import { ModalName } from "@/utils/enums/ModalEnum";
import React from "react";
import CategoriesModal from "./Modals/CategoriesModal";
import { useAppSelector } from "../context/store/hooks";
import SwitchRoleModal from "./Modals/UsersActions/SwitchRoleModal";
import DeleteUser from "./Modals/UsersActions/DeleteUser";
import CreateCategory from "./Modals/Content/CreateCategory";
import ErrorModal from "./Modals/ErrorModal";
import SuccessModal from "./Modals/SuccessModal";
import BanModal from "./Modals/Chat/BanModal";
import CreateModal from "./Modals/forum/Create";
import CreateThreadModal from "./Modals/forum/CreateThreadModal";
import NewsletterSuccessModal from "./Modals/Newsletter/NewsletterSuccessModal";
import NewsletterErrorModal from "./Modals/Newsletter/NewsletterErrorModal";
import SuccessContentModal from "./Modals/Content/SuccessContentModal";
import AuthModal from "./Modals/AuthModal";

const ModalSelector = () =>
{

    const currentSelectedModal = useAppSelector((state) => state.modal.type);

    return (
        <>
            <React.Fragment>
                {currentSelectedModal === ModalName.AuthModal && <AuthModal />}
                {currentSelectedModal === ModalName.Categories && <CategoriesModal />}
                {currentSelectedModal === ModalName.SwitchRole && <SwitchRoleModal />}
                {currentSelectedModal === ModalName.DeleteUser && <DeleteUser />}
                {currentSelectedModal === ModalName.CreateCategory && <CreateCategory />}
                {currentSelectedModal === ModalName.ErrorModal && <ErrorModal />}
                {currentSelectedModal === ModalName.SuccessModal && <SuccessModal />}
                {currentSelectedModal === ModalName.BanModal && <BanModal />}
                {currentSelectedModal === ModalName.ContentSuccess && <SuccessContentModal />}
                {currentSelectedModal === ModalName.CreateDiscussion && <CreateModal />}
                {currentSelectedModal === ModalName.CreateThread && <CreateThreadModal />}
                {currentSelectedModal === ModalName.NewsletterSuccess && <NewsletterSuccessModal />}
                {currentSelectedModal === ModalName.NewsletterError && <NewsletterErrorModal />}
            </React.Fragment>
        </>
    )
}

export default ModalSelector;