import { useContext } from "react";
import CurrentUserContext from "../../Context/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({ activeModal, card, handleCloseModal, handleItemDelete }) {
  //Var
  const currentUser = useContext(CurrentUserContext); //subscribe to user context get user from context
  /*   const isOwned = currentUser._id === card.owner._id; */

  //functions
  const deleteCard = () => {
    handleItemDelete(card);
  };

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseModal}
          type="button"
          className="modal__close"
        ></button>
        <img
          src={card.imageUrl}
          className="modal__image"
          alt="card Image"
          onError={(e) => {
            e.target.src =
              "https://cdn-icons-png.flaticon.com/512/57/57950.png";
          }}
        ></img>
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {/* Checking if user owns card usong short-circuit evaluation */}
          {/* {isOwned  && (
            <button className="modal__delete" onClick={deleteCard}>
              Delete Item
            </button>
          )} */}
          {/* End conditional Statement */}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
