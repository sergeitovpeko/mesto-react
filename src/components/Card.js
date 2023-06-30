import React from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"

function Card({
  card,
  onCardLike,
  onCardDelete,
  onCardClick,
  onConfirmationPopup,
}) {
  const currentUser = React.useContext(CurrentUserContext)
  const isLiked = card.likes.some((user) => user._id === currentUser._id)
  const likeButtonClassName = `elements__button elements__button_like ${
    isLiked ? "elements__button_like_active" : ""
  }`
  const isOwner = card.owner._id === currentUser._id

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleCardClick() {
    onCardClick(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
    onConfirmationPopup(true)
  }

  return (
    <div className="elements__list-item">
      {isOwner && (
        <button
          className="elements__button elements__button_delete"
          onClick={handleDeleteClick}
          type="button"
        />
      )}

      <img
        className="elements__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleCardClick}
      />
      <div className="elements__info">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like">
          <button
            className={likeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          ></button>

          <p className="elements__likes-quantity">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
