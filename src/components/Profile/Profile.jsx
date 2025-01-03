import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import { useEffect } from "react";

function Profile({
  handleCardClick,
  handleAddClick,
  handleOpenEditModal,
  clothingItems,
  onCardLike,
}) {
  useEffect(() => {
    console.log("clothingItems:", clothingItems);
  }, [clothingItems]);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar handleOpenEditModal={handleOpenEditModal} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
