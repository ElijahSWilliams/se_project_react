import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTempUnitContext from "../../Context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import {
  addItem,
  getItems,
  removeItem,
  addCardLike,
  removeCardLike,
} from "../../utils/Api";
import CurrentUserContext from "../../Context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import { checkToken, signIn, signUp } from "../../utils/AUTH";
import { useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { sendNewUserData } from "../../utils/AUTH";
import ClothesSection from "../ClothesSection/ClothesSection";

function App() {
  //State Variables
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: 999,
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  //Global Vars
  const navigate = useNavigate(); //call useNavigate to get the navigate function
  //////////////////////////////////
  //Functions
  //AddButton Function
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  //LoginModal
  const handleOpenLoginModal = () => {
    console.log("Open Login");
    setActiveModal("login-modal");
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("register-modal");
  };

  const handleOpenEditModal = () => {
    setActiveModal("edit-modal");
  };

  //CLose modal function
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    console.log(card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleUnit = () => {
    setCurrentTempUnit(currentTempUnit === "C" ? "F" : "C");
  };

  //handleFormSubmit function
  const onAddItem = (values, token) => {
    //api call
    addItem(values, token)
      .then((newItem) => {
        console.log(newItem);
        setClothingItems((prevItems) => [...prevItems, newItem]); //update state from server
        //close Modal after submission
        closeActiveModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //useEffect to log updated clothingItems
  useEffect(() => {
    console.log("clothingItems:", clothingItems);
  }, [clothingItems]);

  const handleItemDelete = (item) => {
    console.log("deleting");
    console.log(item);

    const token = localStorage.getItem("jwt"); //get token from local storage
    //make api call to delete card
    removeItem(item._id, token)
      .then((data) => {
        console.log(data);
        //filter
        setClothingItems((prevItems) => {
          return prevItems.filter((prevItem) => prevItem._id !== item._id);
        });
        //close method
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //make api call to get weather on load
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //make api call to get items on load
  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        setClothingItems(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //add extra close functions
  useEffect(() => {
    //declare close function
    function handleClose(evt) {
      if (evt.key === "Escape" || evt.target.classList.contains("modal")) {
        closeActiveModal();
      }
    }

    if (activeModal !== "") {
      //if activeModal is open or not equal to an empty string
      document.addEventListener("keydown", handleClose);
      document.addEventListener("click", handleClose);
    }

    //remove event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleClose);
      document.removeEventListener("click", handleClose);
    };
  }, [activeModal]); //dependency array

  //hook to check for a token on load
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      console.log("token found:", token);
      checkToken(token).then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      });
    } else if (!token) {
      console.log("No Token Found");
    }
  }, []);

  //Registration Function
  const handleRegistration = (userData) => {
    console.log("Handle Registration response");
    signUp(userData) //call signup function from auth.js
      .then((res) => {
        console.log("Registation Data:", res); /* Display data in console */
        setIsLoggedIn(true); /* Log user In */
        setCurrentUser(userData);
        console.log(isLoggedIn);
        closeActiveModal(); /* close modal Window */
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Authorization Function
  const handleLogIn = (userData) => {
    console.log("HandleLogin Response");

    signIn(userData) //call signIn function from auth.js
      .then((res) => {
        console.log(res);
        console.log(userData);
        setIsLoggedIn(true); /* Log user in */
        localStorage.setItem("jwt", res.token); //Stores the jwt to localStorage
        //call checkToken to get userData
        return checkToken(res.token).then((user) => {
          console.log(user);
          setCurrentUser(user); //set User Data
          navigate("/profile"); /* Navigate user to profile */
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateUserInfo = (userData, token) => {
    console.log("Handle Update");
    console.log(token);

    //api call
    sendNewUserData(userData, token)
      .then((res) => {
        console.log(res);
        console.log(userData);
        setCurrentUser(userData);
      })
      .then((res) => {
        closeActiveModal();
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    console.log(id);
    console.log(clothingItems);
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array

        // the first argument is the card's id
        addCardLike(id, token) //call api
          .then((updatedCard) => {
            //then with updatedCards
            console.log(updatedCard);
            setClothingItems((cards) => {
              //update ClothingItems array state
              console.log("UpdatedCard:", updatedCard);
              return cards.map(
                (
                  item //for each card,
                ) => (item._id === id ? updatedCard.item : item) //check if item id matches id, if so return updatedCArd.item, if not then return original item
              );
            });
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array

        // the first argument is the card's id
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems(
              (cards) =>
                cards.map((item) => (item._id === id ? updatedCard.item : item)) //if item._id === id then replace the card with UpdatedCard.item, otherwise don't alter the card
            );
          })
          .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleUnit }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleOpenLoginModal={handleOpenLoginModal}
              handleOpenRegisterModal={handleOpenRegisterModal}
              handleRegistration={handleRegistration}
              weatherData={weatherData}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute anonymous={true}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      handleOpenEditModal={handleOpenEditModal}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>

          <Footer />
          {activeModal === "add-garment" && (
            <AddItemModal
              handleCloseModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
            />
          )}
          {activeModal === "register-modal" && (
            <RegisterModal
              handleCloseModal={closeActiveModal}
              handleOpenRegisterModal={handleOpenRegisterModal}
              handleRegistration={handleRegistration}
              isOpen={activeModal === "register-modal"}
            />
          )}
          {activeModal === "login-modal" && (
            <LoginModal
              handleCloseModal={closeActiveModal}
              handleOpenLogin={handleOpenLoginModal}
              handleLogIn={handleLogIn}
              isOpen={activeModal === "login-modal"}
            />
          )}
          {activeModal === "edit-modal" && (
            <EditProfileModal
              handleCloseModal={closeActiveModal}
              handleOpenEditModal={handleOpenEditModal}
              handleUpdateUserInfo={handleUpdateUserInfo}
              isOpen={activeModal === "edit-modal"}
            />
          )}
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseModal={closeActiveModal}
            handleItemDelete={handleItemDelete}
          />
        </CurrentTempUnitContext.Provider>{" "}
        {/* Move closing tag for Temp Context here */}
      </CurrentUserContext.Provider>{" "}
      {/* Move closing tag for User Context here */}
    </div>
  );
}

export default App;
