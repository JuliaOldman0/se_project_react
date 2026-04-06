import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import useForm from "../../hooks/useForm";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (isOpen) {
      resetForm({
        name: "",
        imageUrl: "",
        weather: "",
      });
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit(values);
  };

  const isFormValid =
    values.name.trim() !== "" &&
    values.imageUrl.trim() !== "" &&
    values.weather !== "";

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          required
          minLength="1"
          maxLength="30"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
        />
      </label>

      <label htmlFor="imgUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imgUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__radio-label" htmlFor="hot">
          <input
            id="hot"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />
          <span className="modal__radio-text">Hot</span>
        </label>

        <label className="modal__radio-label" htmlFor="warm">
          <input
            id="warm"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          <span className="modal__radio-text">Warm</span>
        </label>

        <label className="modal__radio-label" htmlFor="cold">
          <input
            id="cold"
            type="radio"
            name="weather"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          <span className="modal__radio-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
