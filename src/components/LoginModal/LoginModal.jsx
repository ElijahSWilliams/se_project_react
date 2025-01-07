import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

function LoginModal({
  handleCloseModal,
  handleLogIn,
  isOpen,
  handleOpenRegisterModal,
}) {
  //State Variable for name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    //pass 'e' to capture form data
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const openRegisterModal = () => {
    handleOpenRegisterModal();
  };

  //useEffect hook to clear inputs during mount
  useEffect(() => {
    return () => {
      //get state of each input and set to empty string
      setEmail("");
      setPassword("");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email:", email);
    console.log("password:", password);
    /*  console.log("ImageUrl:", imageUrl); */
    handleLogIn({ email, password });
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText="Log In"
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
          value={password} //pass 'imageUrl' to value to connect it to the 'imageUrl' state variable
          onChange={handlePasswordChange}
        ></input>
      </label>
      <button
        className="login__signup-button"
        type="button"
        onClick={() => {
          console.log("Signing Up");
          openRegisterModal();
        }}
      >
        Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
