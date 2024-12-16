"use client";
import { useAppDispatch } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { IoIosLock } from "react-icons/io";

const ProtectedContent = () =>
{
  const dispatch = useAppDispatch();

  const openAuthModal = () =>
  {
    dispatch(modalActions.updateModalType(ModalName.AuthModal));
  }

  return (
    <div className="w-full h-[600px] bg-marrow flex flex-col justify-center items-center rounded-lg cursor-pointer" onClick={openAuthModal}>
      <IoIosLock className="text-8xl text-cyan-200" />
      <p className="text-white text-3xl font-bold font-semibold">
        Login to view more content
      </p>
    </div>
  );
};

export default ProtectedContent;
