import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import "./LoginModal.css";


function LoginModal({ isOpen, onClose, onLogin, message, onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  const isFormValid = Object.values(formData).every(
    (field) => field.trim() !== ""
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
          value={formData.email}
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
          value={formData.password}
          onChange={handleChange}
        />
      </label>

      {message && <p className="modal__auth-message">{message}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
