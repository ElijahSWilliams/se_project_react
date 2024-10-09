import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

function AddItemModal({ handleCloseModal, onAddItem, isOpen }) {
  //State Variable for name field
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    //pass 'e' to capture form data

    setName(e.target.value);
  };

  //State variable for Url field
  const [link, setUrl] = useState("");

  const handleLinkChange = (e) => {
    //pass 'e' to capture form data

    setUrl(e.target.value);
  };

  const [radioValue, setRadioValue] = useState("");

  const handleRadioButtonChange = (e) => {
    setRadioValue(e.target.value);
  };

  //useEffect hook to clear inputs during mount
  useEffect(() => {
    return () => {
      //get state of each input and set to empty string
      setName("");
      setUrl("");
      setRadioValue("");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, link, radioValue });
  };

  return (
    <ModalWithForm
      title="New Garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal} //set destructed value in component to the close modal function
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__form-label">
        Name {""}
        <input
          type="text"
          className="modal__form-input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        ></input>
      </label>
      <label htmlFor="link" className="modal__form-label">
        Image {""}
        <input
          type="url"
          className="modal__form-input"
          id="link"
          placeholder="Image URL"
          value={link} //pass 'link' to value to connect it to the 'link' state variable
          onChange={handleLinkChange}
        ></input>
      </label>
      <fieldset className="modal__radio-buttons" onSubmit={handleSubmit}>
        <legend className="modal__legend">Select The Weather Type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="radio"
            value="hot"
            onChange={handleRadioButtonChange}
          ></input>
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="radio"
            value="warm"
            onChange={handleRadioButtonChange}
          ></input>
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="radio"
            value="cold"
            onChange={handleRadioButtonChange}
          ></input>
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
