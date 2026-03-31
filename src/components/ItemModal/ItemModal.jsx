import "./ItemModal.css";
import closeBtn from "../../assets/close_btn.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDelete, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const handleDeleteClick = () => {
    onDelete(card);
  };

  const isOwn =
    isLoggedIn &&
    (card?.owner === currentUser?._id || card?.owner?._id === currentUser?._id);

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeBtn} alt="Close button" />
        </button>

        <img
          src={card?.imageUrl}
          alt={card?.name || "Clothing item"}
          className="modal__image"
        />

        <div className="modal__footer">
          <h2 className="modal__caption">{card?.name}</h2>
          <p className="modal__weather">Weather: {card?.weather}</p>

          {isOwn && (
            <button
              type="button"
              className="modal__delete-button"
              onClick={handleDeleteClick}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
