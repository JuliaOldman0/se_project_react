import "./ModalWithForm.css";
import closeBtn from "../../assets/modal__close-btn.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  isDisabled,
  switchLink,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__actions">
            <button
              type="submit"
              className="modal__submit"
              disabled={isDisabled}
            >
              {buttonText}
            </button>
            {switchLink && switchLink}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
