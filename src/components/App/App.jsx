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
import { addItem, getItems, removeItem } from "../../utils/Api";
import LoginContext from "../../Context/LoginContext";
import ProtectedRoute from "../ProtectedRoute/ProtectRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import { signIn, signUp } from "../../utils/AUTH";
import { useNavigate } from "react-router-dom";

function App() {
  //State
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

  //AddButton Function
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  //LoginModal
  const handleOpenLoginModal = () => {
    setActiveModal("login-modal");
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("register-modal");
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
  const onAddItem = (values) => {
    //api call
    addItem(values)
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
    console.log(clothingItems);
  }, [clothingItems]);

  const handleItemDelete = (item) => {
    console.log("deleting");
    console.log(item);
    //make api call to delete card
    removeItem(item._id)
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      console.log("token found:", token);
    } else if (!token) {
      console.log("No Token Found");
    }
  }, []);

  //Registration Function
  const handleRegistration = (userData) => {
    signUp(userData)
      .then((res) => {
        console.log("Registation Data:", res); /* Display data in console */
        setIsLoggedIn(true); /* Log user In */
        closeActiveModal(); /* close modal Window */
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Authorization Function
  const handleLogIn = (userData) => {
    const navigate = useNavigate(); //call useNavigate to get the navigate function

    signIn(userData)
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true); /* Log user in */
        localStorage.setItem("jwt", res.token); //Stores the jwt to localoStorage
        navigate("/profile"); /* Navigate user to profile */
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleUnit }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />{" "}
              {/* End Main */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    {/* Protect Profile Route  */}
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
                }
              />
              {/* End /profile */}
            </Routes>
          </LoginContext.Provider>
          <Footer />
        </div>

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
            isOpen={activeModal === "register-modal"}
          />
        )}
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseModal={closeActiveModal}
          handleItemDelete={handleItemDelete}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
