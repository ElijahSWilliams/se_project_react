import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ item });
  };

  console.log(item._id);
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={handleCardClick}
      />
      <button className="card__like-button" onClick={handleLike}></button>
    </li>
  );
}

export default ItemCard;
