import "./ItemCard.css";
import CurrentUserContext from "../../Context/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext); //subscribe to context

  const isLiked = item.likes.some((id) => id === currentUser?._id); //check if card is liked by current user
  const isOwner = item.owner === currentUser?._id;
  console.log(isOwner);
  console.log(currentUser);
  console.log("Owner:", item.owner);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };
  console.log(isLiked);

  //change appearance based on liked or unliked
  const itemButtonClassName =
    //if card is not owned, hide card, the after that decide if card i liked or unliked with nested ternary operator
    !isOwner ? "card__hidden" : isLiked ? "card__liked" : "card__unliked";

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleCardClick}
      />
      <button className={itemButtonClassName} onClick={handleLike}></button>
    </li>
  );
}

export default ItemCard;
