import { UserSignUpAction } from "@/actions/user/UserSignUpAction";
import { RegisterValidator } from "@/validation/authentication/signup";
import { useState } from "react";
import { modalActions } from "../../context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { useAppDispatch } from "../../context/store/hooks";
import { authActions } from "../../context/store/slices/auth-slice";
import { useNavigate } from "../useNavigate";

/**
 *
 * @returns formValues, errors, submitted, handleChange, handleSubmit, goToLogin, error where formValues refers to the values of the form, errors refers to the errors in the form, submitted refers to the status of the form submission, handleChange is the function that handles the change in the form, handleSubmit is the function that handles the submission of the form, goToLogin is the function that navigates to the login modal, error is the error message that is displayed when the form submission fails
 */
export const useRegister = () => {
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState<string | undefined>("");

  const [submitted, setSubmitted] = useState(false);

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
    const validator = RegisterValidator({
      ...formValues,
      [name]: value,
    });
    if (!validator.valid) {
      setErrors(validator.errors);
    } else {
      setErrors({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const validator = RegisterValidator(formValues);
    if (validator.valid) {
      const userCreateAction = new UserSignUpAction(formValues);
      const registerResponse = await userCreateAction.execute();
      if (!registerResponse.success) {
        setError(registerResponse.message);
        setSubmitted(false);
        return;
      }
      dispatch(authActions.setSessionStatus(true));
      navigate("/");
      dispatch(modalActions.updateModalType(ModalName.SuccessModal));
    } else {
      setErrors(validator.errors);
    }
  };

  const goToLogin = () => {
    if (submitted) return;
    dispatch(modalActions.updateModalType(ModalName.Login));
  };

  return {
    formValues,
    errors,
    submitted,
    handleChange,
    handleSubmit,
    goToLogin,
    error,
  };
};
