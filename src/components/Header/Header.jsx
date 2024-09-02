import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
function Header() {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={logo} />
        <p className="header__date">DATE, LOCATION</p>
        <button className="header__add-clothes-btn">+ Add Clothes</button>
        <div className="header__user-container">
          <p className="header__username">Name</p>
          <img className="header__avatar" src={avatar} alt="User"></img>
        </div>
      </header>
    </>
  );
}

export default Header;