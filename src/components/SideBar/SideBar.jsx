import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../Context/CurrentUserContext";
import { useNavigate } from "react-router-dom";

function SideBar() {
  //Subscribe to CurrentUserContext
  const { currentUser } = useContext(CurrentUserContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  //functions
  const handleLogout = () => {
    console.log("Logging Out"); //console log for debugging
    localStorage.removeItem("jwt"); //clear token from local storage to log them out
    setIsLoggedIn(false); //update state to false on log out
    navigate("/"); //navigate user back to home/root page
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img
          src={avatar}
          alt="profile image"
          className="sidebar-profile__image"
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>

      <div className="sidebar__actions">
        <p className="sidebar__action">Edit Profile</p>
        <p className="sidebar__action" onClick={handleLogout}>
          Log Out
        </p>
      </div>
    </div>
  );
}

export default SideBar;
