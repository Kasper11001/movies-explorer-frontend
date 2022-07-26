import "./Register.css";
import React from "react";
import { Link } from "react-router-dom";

function Register() {

  return (
    <>
      <form className="form" noValidate>
      <Link className="form__logo-link" to="/"><div className="form__logo"></div></Link>
      <h1 className="form__title">Добро пожаловать!</h1>
      <fieldset className="form__fieldset">
      <label className="form__lable" htmlFor="input-name">Имя</label>
          <input id="input-name" type="text" className="form__input" name="name" required></input>
          <span className="error"></span>
      <label className="form__lable" htmlFor="input-email">E-mail</label>
          <input id="input-email" type="email" className="form__input form__input_validation_ok" name="email" required></input>
          <span className="error"></span>
        <label className="form__lable" htmlFor="input-password">Пароль</label>
          <input id="input-password" type="password" className="form__input" name="password" required></input>
          <span className="error">Что-то пошло не так...</span>
      </fieldset>
        <p className="submit-error"></p>
        <button className="form__button" type="submit">Зарегистрироваться</button>
        <p className="form__text">Уже зарегистрированы? <Link to="/signin" className="form__link">Войти</Link></p>
      </form>
    </>
  );
}

export default Register;
