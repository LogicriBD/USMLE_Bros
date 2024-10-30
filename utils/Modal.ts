import { appStore } from "@/src/context/store/redux-store";
import { modalActions } from "@/src/context/store/slices/modal-slice";

export const closeModal = () => {
  appStore.dispatch(modalActions.removeModal());
};
