import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

function RegisterModal({ handleCloseModal, isOpen }) {
  //State Variable for name field
  const [name, setName] = useState("");

  const handleEmailChange = (e) => {
    //pass 'e' to capture form data
    setName(e.target.value);
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
    console.log("email:", email);
    console.log("ImageUrl:", imageUrl);
    onAddItem({ name, imageUrl, radioValue });
  };

  return (
    <ModalWithForm
      title="Register"
      buttonText="Register"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal} //set destructed value in component to the close modal function
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__form-label">
        Email {""}
        <input
          type="email"
          className="modal__form-input"
          id="email"
          placeholder="Email"
          value={name}
          onChange={handleNameChange}
        ></input>
      </label>
      <label className="modal__form-label">
        Password {""}
        <input
          type="password"
          className="modal__form-input"
          id="password"
          placeholder="Enter Password"
          value={imageUrl} //pass 'imageUrl' to value to connect it to the 'imageUrl' state variable
          onChange={handleLinkChange}
        ></input>
      </label>
      <fieldset className="modal__radio-buttons">
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

export default RegisterModal;
