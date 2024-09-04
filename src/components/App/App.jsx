import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useState } from "react";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New Garment"
        buttonText="Add Garment"
        activeModal={activeModal}
        handleCloseModal={closeActiveModal} //set destructed value in component to the close modal function
      >
        <label htmlFor="Name" className="modal__form-label">
          Name {""}
          <input
            type="text"
            className="modal__form-input"
            id="name"
            placeholder="Name"
          ></input>
        </label>
        <label htmlFor="imageURL" className="modal__form-label">
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
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input type="radio" className="modal__radio-input" id="hot"></input>
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
    </div>
  );
}

export default App;
