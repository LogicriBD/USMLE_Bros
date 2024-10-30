import { LoginValidator } from "@/validation/authentication/login";
import { UserLoginAction } from "@/actions/user/UserLoginAction";
import { useState } from "react";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { useAppDispatch } from "../../context/store/hooks";
import { authActions } from "../../context/store/slices/auth-slice";
import { UserFetchByEmailAction } from "@/actions/user/UserFetchByEmailAction";
import { appStore } from "../../context/store/redux-store";
import { logger } from "@/utils/Logger";
import { useNavigate } from "../useNavigate";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const validator = LoginValidator(formValues);
      if (validator.valid) {
        const loginAction = new UserLoginAction(formValues);
        const loginResponse = await loginAction.execute();
        if (!loginResponse.success) {
          setError(loginResponse.message);
          setSubmitted(false);
          return;
        }
        dispatch(authActions.setSessionStatus(true));

        const userAction = new UserFetchByEmailAction({
          email: appStore.getState().user.email,
        });
        await userAction.execute();
        navigate("/");
        dispatch(modalActions.updateModalType(ModalName.SuccessModal));
      } else {
        setSubmitted(false);
        setErrors({
          email: validator.errors.email,
          password: validator.errors.password,
        });
      }
    } catch (error: any) {
      logger.error(error);
      setSubmitted(false);
    }
  };

  const goToRegister = () => {
    if (submitted) return;
    dispatch(modalActions.updateModalType(ModalName.SignUp));
  };

  return {
    formValues,
    errors,
    submitted,
    handleChange,
    handleSubmit,
    goToRegister,
    error,
  };
};
