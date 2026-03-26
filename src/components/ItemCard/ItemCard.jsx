import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import heartIcon from "../../assets/heart.svg";
import heartLikedIcon from "../../assets/heart_liked.svg";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked =
    item.likes &&
    item.likes.some((like) =>
      typeof like === "string" ?
        like === currentUser?._id
      : like._id === currentUser?._id,
    );

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>

        {isLoggedIn && (
          <button
            type="button"
            className="card__like-button"
            onClick={handleLike}
          >
            <img
              src={isLiked ? heartLikedIcon : heartIcon}
              alt={isLiked ? "Unlike" : "Like"}
              className="card__like-icon"
            />
          </button>
        )}
      </div>

      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
