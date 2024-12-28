import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../Context/CurrentUserContext";

function Header({
  handleAddClick,
  handleOpenLoginModal,
  handleOpenRegisterModal,
  handleRegistration,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  /*   console.log(weatherData.main); */

  const { currentUser } = useContext(CurrentUserContext); //retrieve user context

  //Extract Context
  const { name, avatar } = currentUser || {}; //empty object in case currentUser in empty. This will create an undefined error instead of a Type error

  //if there is a name but no avatar, get FirstLetter and set to uppercase, otherwise display 'User Info missing'
  const firstLetter =
    !avatar && name ? name.charAt(0).toUpperCase() : "User Information Missing";

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>

      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {!currentUser ? (
        //If no user, render Log In and Sign Up buttons
        <>
          <button
            type="button"
            onClick={handleOpenRegisterModal}
            className="header__add-clothes-btn"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleOpenLoginModal}
            className="header__add-clothes-btn"
          >
            Log In
          </button>
        </>
      ) : (
        //If there is a currentUser, render Add CLothes, and Profile Info
        <>
          <button
            type="button"
            onClick={handleAddClick}
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
        </>
      )}

      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__username">{currentUser.name}</p>
          {/* If Avatar is Provided */}
          {avatar ? (
            <img className="header__avatar" src={avatar} alt="User Image"></img> //Render Avatar
          ) : (
            /* If Avatar Not Provided */
            <div className="placeholder__image">{firstLetter}</div> //Render FirstLetter of Username
          )}{" "}
          {/* End Avatar Conditional Statement */}
        </div>
      </Link>
    </header>
  );
}

export default Header;
