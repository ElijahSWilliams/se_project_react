import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <>
      <div className="modal">
        <div className="modal__content">
          <h2 className="modal__title">New Garment</h2>
          <button type="button" className="modal__close"></button>
          <form className="modal__form">
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
              <legend className="modal__legend">
                Select The Weather Type:
              </legend>
              <label
                htmlFor="hot"
                className="modal__label modal__label_type_radio"
              >
                <input
                  type="radio"
                  className="modal__radio-input"
                  id="hot"
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
            <button type="submit" className="modal__submit">
              Add Garment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
