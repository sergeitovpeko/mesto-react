import React from "react"
import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import PopupWithForm from "./PopupWithForm"
import ImagePopup from "./ImagePopup"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main
          onEditProfile={setIsEditProfilePopupOpen}
          onAddPlace={setIsAddPlacePopupOpen}
          onEditAvatar={setIsEditAvatarPopupOpen}
          onCardClick={setSelectedCard}
        />
        <Footer />

        <PopupWithForm
          name="popupEditProfile"
          title="Редактировать профиль"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <div className="popup__form-input">
            <input
              className="popup__form-item popup__form-item_input_name"
              type="text"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span
              className="popup__form-error popup__form-error_active"
              id="error-profile"
            ></span>
          </div>
          <div className="popup__form-input">
            <input
              className="popup__form-item popup__form-item_input_job"
              type="text"
              name="about"
              placeholder="Профессия"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="popup__form-error popup__form-error_active"></span>
          </div>
        </PopupWithForm>

        <PopupWithForm
          name="popupNewPlace"
          title="Новое место"
          buttonText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <div className="popup__form-input">
            <input
              className="popup__form-item popup__form-item_input_name"
              type="text"
              name="name"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span
              className="popup__form-error popup__form-error_active"
              id="error-place"
            ></span>
          </div>
          <div className="popup__form-input">
            <input
              className="popup__form-item popup__form-item_input_job"
              type="url"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__form-error popup__form-error_active"></span>
          </div>
        </PopupWithForm>

        <PopupWithForm
          name="popupConfirmation"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>

        <PopupWithForm
          name="popupEditAvatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <div className="popup__form-input">
            <input
              className="popup__form-item popup__form-item_input_avatar"
              type="url"
              name="avatar"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__form-error popup__form-error_active"></span>
          </div>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  )
}

export default App
