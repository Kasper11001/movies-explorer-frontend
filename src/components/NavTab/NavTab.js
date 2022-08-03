import "./NavTab.css";
import { Link, useNavigate } from "react-router-dom";

function NavTab({
  loggedIn,
  burger
}) {

  const history = useNavigate();

  function handleButtonClickEnter() {
    history("/signin");
  }

  function handleButtonClickProf() {
    history("/profile");
  }

  function menuClick() {
    burger();
  }

  return (
    <div className="header-menu">
      <Link className="form__logo-link" to="/"><div className="header-menu__logo"></div></Link>
      {loggedIn ? (
        <nav className="header-menu__nav header-menu__nav_not-landing">
          <div className="header-menu__links">
            <Link to="/movies" className="header-menu__link-black">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="header-menu__link-black">
              Сохранённые фильмы
            </Link>
          </div>
          <button
            className="header-menu__button-profile"
            type="button"
            onClick={handleButtonClickProf}
          >
            Аккаунт
          </button>
        </nav>
      ) : (
        <nav className="header-menu__nav">
          <Link to="/signup" className="header-menu__link">
            Регистрация
          </Link>
          <button
            className="header-menu__button-enter"
            type="button"
            onClick={handleButtonClickEnter}
          >
            Войти
          </button>
        </nav>
      )}
      <div className="header-menu__burger" onClick={menuClick}></div>
    </div>
  );
}

export default NavTab;
