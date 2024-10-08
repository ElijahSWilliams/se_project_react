import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img
        src={avatar}
        alt="profile image"
        className="sidebar-profile__image"
      />
      <p className="sidebar__username">Terrance</p>
    </div>
  );
}

export default SideBar;
