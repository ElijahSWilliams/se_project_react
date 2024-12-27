import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../Context/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({ handleCardClick, handleAddClick, clothingItems }) {
  const currentUser = useContext(CurrentUserContext);

  //filter items based on ownership
  //compare user items by userid and itemownerId
  const userItems = clothingItems.filter(
    (item) => item._id === currentUser._id
  );
  ///////
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your Items</p>
        <button className="clothes-section__button" onClick={handleAddClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems
          .slice() // create shallow copy of array
          .reverse() //reverse array order
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick} //passed from App componenet to Main Then to ItemCard while renaming to 'onCardClick'
              />
            );
          })}
      </ul>
    </div>
  );
}

export default ClothesSection;
