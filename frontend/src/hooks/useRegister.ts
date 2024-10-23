import { UserSignUpAction } from "@/actions/user/UserSignUpAction";
import { RegisterValidator } from "@/validation/authentication/signup";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { modalActions } from "../context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";

export const useRegister = () => {
  const dispatch = useDispatch();

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
    const validator = RegisterValidator(formValues);
    if (validator.valid) {
      const userCreateAction = new UserSignUpAction(formValues);
      const credentials = await userCreateAction.execute();
      console.log("Form submitted", formValues, credentials);
      closeModal();
    } else {
      setErrors(validator.errors);
    }
  };

  const closeModal = () => {
    dispatch(modalActions.removeModal());
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
    closeModal,
    goToLogin,
  };
};
