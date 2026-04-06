import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import useForm from "../../hooks/useForm";
import "./RegisterModal.css";

function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  message,
  onSwitchToLogin,
}) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({
        email: "",
        password: "",
        name: "",
        avatar: "",
      });
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  const isFormValid = Object.values(values).every(
    (field) => field.trim() !== "",
  );

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign Up"
      isDisabled={!isFormValid}
      switchLink={
        <button type="button" className="modal__link" onClick={onSwitchToLogin}>
          or Log In
        </button>
      }
    >
      <label className="modal__label">
        Email*
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
        Password*
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

      <label className="modal__label">
        Name*
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Avatar URL*
        <input
          className="modal__input"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>

      {message && <p className="modal__auth-message">{message}</p>}
    </ModalWithForm>
  );
}

export default RegisterModal;
