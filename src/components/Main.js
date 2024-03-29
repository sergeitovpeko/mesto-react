import React from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"
import Card from "./Card"

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onDeletedCard,
  onConfirmationPopup,
}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <button className="profile__avatar-button" type="button">
            <img
              className="profile__image"
              src={currentUser.avatar}
              alt="Фотография Жак-Ив Кусто"
              onClick={() => {
                onEditAvatar(true)
              }}
            />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__button profile__button_type-edit"
            type="button"
            onClick={() => {
              onEditProfile(true)
            }}
          ></button>
        </div>
        <p className="profile__job">{currentUser.about}</p>
        <button
          className="profile__button profile__button_type-add"
          type="button"
          onClick={() => {
            onAddPlace(true)
          }}
        ></button>
      </section>

      <section className="elements__list">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardDelete={onDeletedCard}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onConfirmationPopup={onConfirmationPopup}
          />
        ))}
      </section>
    </main>
  )
}

export default Main
