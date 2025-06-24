import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function LoginModal({ isOpen, onClose, onLogin, message }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  return (
    <ModalWithForm
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label>
        Email
        <input type="email" name="email" required onChange={handleChange} />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
        />
      </label>
      {message && <p className="auth-message">{message}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
