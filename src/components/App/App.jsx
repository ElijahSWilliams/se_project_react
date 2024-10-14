import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import currentTempUnitContext from "../../Context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { addItem, getItems, removeItem } from "../../utils/Api";

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

  //AddButton Function
  const handleAddClick = () => {
    setActiveModal("add-garment");
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
    console.log(values);
    setClothingItems([values, ...clothingItems]); //save item to a copy of clothingItem state array with spread operator
    //api call
    addItem(values).then((data) => {
      console.log(data);
    });
    //close Modal
    closeActiveModal();
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
        setClothingItems((prevItem) => {
          prevItem.filter((item) => item._id !== itemId);
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

  return (
    <div className="page">
      <currentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleUnit }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
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
            />
            <Route
              path="/profile"
              element={<Profile handleCardClick={handleCardClick} />}
            />
          </Routes>
          <Footer />
        </div>

        {activeModal === "add-garment" && (
          <AddItemModal
            handleCloseModal={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />
        )}
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseModal={closeActiveModal}
          handleItemDelete={handleItemDelete}
        />
      </currentTempUnitContext.Provider>
    </div>
  );
}

export default App;
