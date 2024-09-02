function ItemCard({ item }) {
  return (
    <div>
      <h2>{item.name}</h2>
      <img src={item.link} alt={item.name} className="" />
    </div>
  );
}

export default ItemCard;
