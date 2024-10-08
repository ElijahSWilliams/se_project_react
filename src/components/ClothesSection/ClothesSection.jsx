import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div className="">
        <p>Your Items</p>
        <button>+ Add New</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              /* onCardClick={handleCardClick} */ //passed from App componenet to Main Then to ItemCard while renaming to 'onCardClick'
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
