import React, { useEffect, useState } from "react"
import api from "../utils/Api"
import Card from "./Card"

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState("")
  const [userDescription, setUserDescription] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [cards, getInitialCards] = useState([])

  useEffect(() => {
    api
      .getUserInfo()
      .then((profileUserInfo) => {
        setUserName(profileUserInfo.name)
        setUserDescription(profileUserInfo.about)
        setUserAvatar(profileUserInfo.avatar)
      })
      .catch((error) => console.log(`Ошибка: ${error}`))

    api
      .getInitialCards()
      .then((cardsData) => {
        getInitialCards(
          cardsData.map((data) => ({
            likes: data.likes,
            name: data.name,
            link: data.link,
            cardId: data._id,
          }))
        )
      })
      .catch((error) => console.log(`Ошибка: ${error}`))
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <button className="profile__avatar-button" type="button">
            <img
              className="profile__image"
              src={userAvatar}
              alt="Фотография Жак-Ив Кусто"
              onClick={() => {
                onEditAvatar(true)
              }}
            />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__button profile__button_type-edit"
            type="button"
            onClick={() => {
              onEditProfile(true)
            }}
          ></button>
        </div>
        <p className="profile__job">{userDescription}</p>
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
            key={card.cardId}
            likes={card.likes}
            name={card.name}
            link={card.link}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  )
}

export default Main
