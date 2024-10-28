import { UserSignUpAction } from "@/actions/user/UserSignUpAction";
import { RegisterValidator } from "@/validation/authentication/signup";
import { useState } from "react";
import { modalActions } from "../context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { closeModal } from "@/utils/Modal";
import { useAppDispatch } from "../context/store/hooks";
import { authActions } from "../context/store/slices/auth-slice";

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

  const [error, setError] = useState<string | undefined>("");

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

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
        return;
      }
      dispatch(authActions.setSessionStatus(true));
      closeModal();
    } else {
      setErrors(validator.errors);
    }
  };

  const goToLogin = () => {
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
