import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  handleCloseModal,
  isOpen,
  onSubmit,
}) {
  return (
    <>
      <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
        {" "}
        {/* if activeModal is true, add modal_opned else is empty string */}
        <div className="modal__content">
          <h2 className="modal__title">{title}</h2>
          <button
            onClick={handleCloseModal}
            type="button"
            className="modal__close"
          ></button>
          <form className="modal__form" onSubmit={onSubmit}>
            {children}
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalWithForm;
