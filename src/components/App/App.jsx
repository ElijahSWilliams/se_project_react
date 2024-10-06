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
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: 999,
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("C");

  //AddButton Function
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  //CLose modal function
  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleUnit = () => {
    setCurrentTempUnit(currentTempUnit === "C" ? "F" : "C");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        /*  console.log(data); */
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        console.log("FilteredData:" + filteredData.temperature);
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

  console.log(currentTempUnit);

  return (
    <div className="page">
      <currentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleUnit }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
        <ModalWithForm
          title="New Garment"
          buttonText="Add Garment"
          isOpen={activeModal === "add-garment"}
          handleCloseModal={closeActiveModal} //set destructed value in component to the close modal function
        >
          <label htmlFor="name" className="modal__form-label">
            Name {""}
            <input
              type="text"
              className="modal__form-input"
              id="name"
              placeholder="Name"
            ></input>
          </label>
          <label htmlFor="link" className="modal__form-label">
            Image {""}
            <input
              type="url"
              className="modal__form-input"
              id="link"
              placeholder="Image URL"
            ></input>
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select The Weather Type:</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                className="modal__radio-input"
                id="hot"
                name="radio"
              ></input>
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                className="modal__radio-input"
                id="warm"
                name="radio"
              ></input>
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                className="modal__radio-input"
                id="cold"
                name="radio"
              ></input>
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          handleCloseModal={closeActiveModal}
        />
      </currentTempUnitContext.Provider>
    </div>
  );
}

export default App;
