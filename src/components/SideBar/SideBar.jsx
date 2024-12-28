import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../Context/CurrentUserContext";

function SideBar() {
  //Subscribe to CurretnUserContext
  const { currentUser } = useContext(CurrentUserContext);
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
        <p className="sidebar__action">Log Out</p>
      </div>
    </div>
  );
}

export default SideBar;
