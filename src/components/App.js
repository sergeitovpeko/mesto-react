import React from "react"
import { useState, useEffect } from "react"
import Header from "./Header"
import Main from "./Main"
import EditProfilePopup from "./EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup"
import AddPlacePopup from "./AddPlacePopup"
import PopupConfirmation from "./PopupConfirmation"
import ImagePopup from "./ImagePopup"
import Footer from "./Footer"
import CurrentUserContext from "../contexts/CurrentUserContext"

import api from "../utils/Api"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)

  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [deletedCard, setDeletedCard] = useState({})
  const [selectedCard, setSelectedCard] = useState({})

  useEffect(() => {
    api
      .getUserInfo()
      .then((profile) => setCurrentUser(profile))
      .catch((error) => console.log(`Ошибка: ${error}`))

    api
      .getInitialCards()
      .then((data) => {
        setCards(
          data.map((card) => ({
            _id: card._id,
            name: card.name,
            link: card.link,
            likes: card.likes,
            owner: card.owner,
          }))
        )
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }, [])

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isConfirmationPopupOpen ||
    selectedCard.link

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape)
      return () => {
        document.removeEventListener("keydown", closeByEscape)
      }
    }
  }, [isOpen])

  function closeByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups()
    }
  }

  //ФУНКЦИЯ ЗАКРЫТИЯ ПОПАПОВ ЕСЛИ НАХОДЯТЬСЯ В TRUE
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsConfirmationPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
    setDeletedCard({})
  }

  function changeAddPlaceSubmit(data) {
    setIsLoading(true)
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards])

        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  function changeUpdateUser(newUserInfo) {
    setIsLoading(true)
    api
      .editUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  function changeUpdateAvatar(newAvatar) {
    setIsLoading(true)
    api
      .editUserPhoto(newAvatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  function changeCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id)

    if (isLiked) {
      api
        .dislikeCard(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((error) => console.log(`Ошибка: ${error}`))
    } else {
      api
        .likeCard(card._id)
        .then((newCard) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          )
        )
        .catch((error) => console.log(`Ошибка: ${error}`))
    }
  }

  function changeCardDelete(card) {
    setIsLoading(true)
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id))
        closeAllPopups()
      })

      .catch((error) => console.log(`Ошибка: ${error}`))
      .finally(() => setIsLoading(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            onEditProfile={setIsEditProfilePopupOpen}
            onEditAvatar={setIsEditAvatarPopupOpen}
            onAddPlace={setIsAddPlacePopupOpen}
            onConfirmationPopup={setIsConfirmationPopupOpen}
            onDeletedCard={setDeletedCard}
            onCardClick={setSelectedCard}
            onCardLike={changeCardLike}
            cards={cards}
          />
          <Footer />
          <AddPlacePopup
            onAddPlace={changeAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
            onCloseOverlay={closeByOverlay}
          />

          <EditAvatarPopup
            onUpdateAvatar={changeUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onLoading={isLoading}
            onCloseOverlay={closeByOverlay}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={changeUpdateUser}
            onClose={closeAllPopups}
            onLoading={isLoading}
            onCloseOverlay={closeByOverlay}
          />

          <PopupConfirmation
            onClose={closeAllPopups}
            isOpen={isConfirmationPopupOpen}
            onCardDelete={changeCardDelete}
            onLoading={isLoading}
            card={deletedCard}
            onCloseOverlay={closeByOverlay}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onCloseOverlay={closeByOverlay}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
