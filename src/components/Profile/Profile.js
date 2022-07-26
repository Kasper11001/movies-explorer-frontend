import './Profile.css';
import React from "react";

function Profile() {
  return (
    <>
    <main className="profile">
      <form noValidate>
      <h1 className="profile__title">Привет, Виталий!</h1>
      <div className="profile__container">
        <p className="profile__name">Имя</p>
        <input className="profile__text" type="text" name="name" required></input>Виталий
      </div>
      <span className="error-profile"></span>
      <div className="profile__container">
      <p className="profile__name">E-mail</p>
        <input className="profile__text" type="email" name="email" required></input>pochta@yandex.ru
      </div>
      <span className="error-profile"></span>
      <ul className="profile__links">
      <li><p className="submit-error"></p></li>
        <li><button className="profile__link profile__link-button" type="submit">Редактировать</button></li>
        <li><p className="profile__link profile__link_color_red">Выйти из аккаунта</p></li>
      </ul>
      </form>
    </main>
    </>

  );
}

export default Profile;
