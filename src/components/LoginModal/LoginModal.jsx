import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import useForm from "../../hooks/useForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, message, onSwitchToRegister }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({
        email: "",
        password: "",
      });
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  const isFormValid = Object.values(values).every(
    (field) => field.trim() !== "",
  );

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log In"
      isDisabled={!isFormValid}
      switchLink={
        <button
          type="button"
          className="modal__link"
          onClick={onSwitchToRegister}
        >
          or Sign Up
        </button>
      }
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>

      {message && <p className="modal__auth-message">{message}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
