"use client";
import { useSelector } from "react-redux";
import { ModalName } from "@/utils/enums/ModalEnum";
import React from "react";
import { shallowEqual } from "react-redux";
import CategoriesModal from "./Modals/CategoriesModal";
import AuthModal from "./Modals/AuthModal";
import { RootState } from "@/lib/store/redux-store";

const ModalSelector = () => {

    const currentSelectedModal = useSelector((state:RootState) => state.modal.type, shallowEqual);

    return (
        <>
            <React.Fragment>
                {currentSelectedModal === ModalName.Categories && <CategoriesModal />}
                {currentSelectedModal === ModalName.Login && <AuthModal />}
            </React.Fragment>
        </>
    )
}

export default ModalSelector;