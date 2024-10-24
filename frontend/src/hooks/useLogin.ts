import { LoginValidator } from "@/validation/authentication/login";
import { UserLoginAction } from "@/actions/user/UserLoginAction";
import {  useState } from "react";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { closeModal } from "@/utils/Modal";
import { useAppDispatch, useAppSelector } from "../context/store/hooks";
import { authActions } from "../context/store/slices/auth-slice";
import { UserFetchByEmailAction } from "@/actions/user/UserFetchByEmailAction";
import { appStore } from "../context/store/redux-store";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const validator = LoginValidator(formValues);
    if (validator.valid) {
      const loginAction = new UserLoginAction(formValues);
      await loginAction.execute();
      dispatch(authActions.setSessionStatus(true));

      const userAction = new UserFetchByEmailAction({ email: appStore.getState().user.email });
      await userAction.execute();
    } else {
      setErrors({
        email: validator.errors.email,
        password: validator.errors.password,
      });
    }
    closeModal();
  };

  const goToRegister = () => {
    dispatch(modalActions.updateModalType(ModalName.SignUp));
  };

  return {
    formValues,
    errors,
    submitted,
    handleChange,
    handleSubmit,
    goToRegister,
  };
};
