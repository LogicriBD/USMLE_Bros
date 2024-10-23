"use client";
import { ModalName } from "@/utils/enums/ModalEnum";
import React from "react";
import CategoriesModal from "./Modals/CategoriesModal";
import AuthModal from "./Modals/AuthModal";
import SignUpModal from "./Modals/SignUpModal";
import { useAppSelector } from "../context/store/hooks";

const ModalSelector = () =>
{

    const currentSelectedModal = useAppSelector((state) => state.modal.type);

    return (
        <>
            <React.Fragment>
                {currentSelectedModal === ModalName.Categories && <CategoriesModal />}
                {currentSelectedModal === ModalName.Login && <AuthModal />}
                {currentSelectedModal === ModalName.SignUp && <SignUpModal />}
            </React.Fragment>
        </>
    )
}

export default ModalSelector;