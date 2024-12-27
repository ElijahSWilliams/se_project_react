import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

function Profile({
  handleCardClick,
  handleAddClick,
  clothingItems,
  setIsLoggedIn,
}) {
  const handleLogout = () => {
    const navigate = useNavigate();

    console.log("Logging Out"); //console log for debugging
    localStorage.removeItem("jwt"); //clear token from local storage to log them out
    setIsLoggedIn(false); //update state to false on log out
    navigate("/"); //navigate user back to home/root page
  };

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
