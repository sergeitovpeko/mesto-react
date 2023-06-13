import React from "react"

function Card(card) {
  function handleCardClick() {
    card.onCardClick(card)
  }

  return (
    <div className="elements__list-item">
      <button
        className="elements__button elements__button_delete"
        type="button"
      ></button>
      <img
        className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="elements__info">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like">
          <button
            className="elements__button elements__button_like"
            type="button"
          ></button>
          <p className="elements__likes-quantity">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
