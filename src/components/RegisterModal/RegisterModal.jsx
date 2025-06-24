import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

function RegisterModal({ isOpen, onClose, onRegister, message }) {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label>
        Name
        <input type="text" name="name" required onChange={handleChange} />
      </label>
      <label>
        Avatar URL
        <input type="url" name="avatar" required onChange={handleChange} />
      </label>
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

export default RegisterModal;
