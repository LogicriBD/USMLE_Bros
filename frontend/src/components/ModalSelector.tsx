"use client";
import { useSelector } from "react-redux";
import { ModalName } from "@/utils/enums/ModalEnum";
import React from "react";
import { shallowEqual } from "react-redux";
import CategoriesModal from "./Modals/CategoriesModal";
import AuthModal from "./Modals/AuthModal";
import { RootState } from "@/src/context/store/redux-store";
import SignUpModal from "./Modals/SignUpModal";

const ModalSelector = () =>
{

    const currentSelectedModal = useSelector((state: RootState) => state.modal.type, shallowEqual);

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