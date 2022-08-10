import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiServer from "../../utils/MainApi";
import { useFormWithValidation } from "../Validation/Validation";

function Login({ onLogin }) {

  let navigate = useNavigate();

  const validation = useFormWithValidation();
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const { password, email } = validation.values;
    apiServer.login(password, email)
      .then((data) => {
        if (data.message === 'loggedIn') {
          onLogin();
        }
      })
      .catch((err) => {
        setText(err);
      });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <Link className="form__logo-link" to="/"><div className="form__logo"></div></Link>
      <h1 className="form__title">Рады видеть!</h1>
      <fieldset className="form__fieldset">
        <label className="form__lable" htmlFor="input-email">E-mail</label>
        <input id="input-email" type="email" className="form__input" name="email" pattern="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$" value={validation.values.email} onChange={validation.handleChange} required></input>
        <span className="error">{validation.errors.email}</span>
        <label className="form__lable" htmlFor="input-password">Пароль</label>
        <input id="input-password" type="password" className="form__input" name="password" value={validation.values.password} onChange={validation.handleChange} minLength="8" required></input>
        <span className="error">{validation.errors.password}</span>
      </fieldset>
      <p className="submit-error">{text}</p>
      <button className="form__button" type="submit" disabled={!validation.isValid}>Войти</button>
      <p className="form__text">Ещё не зарегистрированы? <Link to="/signup" className="form__link">Регистрация</Link></p>
    </form>
  );
}

export default Login;
