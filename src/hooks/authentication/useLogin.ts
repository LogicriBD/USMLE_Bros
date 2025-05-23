/* eslint-disable react-hooks/exhaustive-deps */
import { LoginValidator } from "@/validation/authentication/login";
import { useEffect, useState } from "react";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { useAppDispatch } from "../../context/store/hooks";
import { authActions } from "../../context/store/slices/auth-slice";
import { UserFetchByEmailAction } from "@/actions/user/UserFetchByEmailAction";
import { appStore } from "../../context/store/redux-store";
import { logger } from "@/utils/Logger";
import { useNavigate } from "../useNavigate";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { GoogleSignInAction } from "@/actions/user/GoogleSignInAction";

/**
 *
 * @returns formValues, errors, submitted, handleChange, handleSubmit, goToRegister, error where formValues refers to the values of the form, errors refers to the errors in the form, submitted refers to the status of the form submission, handleChange is the function that handles the change in the form, handleSubmit is the function that handles the submission of the form, goToRegister is the function that navigates to the register modal, error is the error message that is displayed when the form submission fails
 */
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

  const [error, setError] = useState<string | undefined>("");

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setError(undefined);
    if (type === "checkbox" || type === "radio") {
      setFormValues({
        ...formValues,
        [name]: !formValues[name],
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
    const validator = LoginValidator({
      ...formValues,
      [name]: value,
    });
    if (!validator.valid) {
      setErrors(validator.errors);
    } else {
      setErrors({
        email: "",
        password: "",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitted(true);
    try {
      const googleSignInAction = new GoogleSignInAction();
      const response = await googleSignInAction.execute();
      if (!response.success) {
        setError(response.message);
        setSubmitted(false);
        return;
      }
      dispatch(authActions.setSessionStatus(true));
      const userAction = new UserFetchByEmailAction({
        email: appStore.getState().user.email,
      });
      await userAction.execute();
      dispatch(modalActions.updateModalType(ModalName.SuccessModal));
    } catch (error: any) {
      logger.error(error);
    } finally {
      setSubmitted(false);
    }
  };

  const goToRegister = () => {
    if (submitted) return;
    navigate("/authentication/register");
  };

  useEffect(() => {
    dispatch(loaderActions.turnOff());
  }, []);

  return {
    formValues,
    errors,
    submitted,
    handleChange,
    goToRegister,
    error,
    handleGoogleSignIn,
  };
};
