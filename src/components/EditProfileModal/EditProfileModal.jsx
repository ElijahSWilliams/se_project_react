import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";

function EditProfileModal({ handleCloseModal, isOpen }) {
  //State Variable for name field
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    //pass 'e' to capture form data
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  //useEffect hook to clear inputs during mount
  useEffect(() => {
    return () => {
      //get state of each input and set to empty string
      setName("");
      setAvatar("");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Avatar:", avatar);
    /*  console.log("ImageUrl:", imageUrl); */
    /*  handleLogIn({ email, password }); */
    handleCloseModal();
  };

  return (
    <ModalWithForm
      title="Change Profile Data"
      buttonText="Save Changes"
      isOpen={isOpen}
      handleCloseModal={handleCloseModal} //set destructed value in component to the close modal function
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__form-label">
        Name {""}
        <input
          type="name"
          className="modal__form-input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        ></input>
      </label>
      <label className="modal__form-label">
        Avatar {""}
        <input
          type="url"
          className="modal__form-input"
          id="url"
          placeholder="Enter Url"
          value={avatar} //pass 'imageUrl' to value to connect it to the 'imageUrl' state variable
          onChange={handleAvatarChange}
        ></input>
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
