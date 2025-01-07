import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

function RegisterModal({
  handleCloseModal,
  handleRegistration,
  isOpen,
  handleOpenLogin,
}) {
  //State Variable for fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  //Update field info
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAvatarChange = (e) => setAvatar(e.target.value);

  //useEffect hook to clear inputs during mount
  useEffect(() => {
    return () => {
      //get state of each input and set to empty string
      setName("");
      setEmail("");
      setPassword("");
      setAvatar("");
    };
  }, [isOpen]); //Run useEffect only when modal opens or closes

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("ImageUrl:", avatar);
    console.log("Name:", name);
    console.log("password:", password);
    handleRegistration({ name, email, avatar, password }); //pass information to submit function
  };

  const handleOpenLoginModal = () => {
    handleOpenLogin();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
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
          value={email}
          onChange={handleEmailChange}
        ></input>
      </label>
      <label className="modal__form-label">
        Password {""}
        <input
          type="password"
          className="modal__form-input"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
      </label>
      <label className="modal__form-label">
        Name {""}
        <input
          type="text"
          className="modal__form-input"
          id="name"
          placeholder="Enter Name"
          value={name}
          onChange={handleNameChange}
        ></input>
      </label>
      <label className="modal__form-label">
        Avatar Url {""}
        <input
          type="url"
          className="modal__form-input"
          id="link"
          placeholder="Enter Url"
          value={avatar} //pass 'imageUrl' to value to connect it to the 'imageUrl' state variable
          onChange={handleAvatarChange}
        ></input>
      </label>
      <button
        className="modal__login"
        type="button"
        onClick={() => {
          console.log("Loggin In");
          handleOpenLoginModal();
        }}
      >
        Login
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
