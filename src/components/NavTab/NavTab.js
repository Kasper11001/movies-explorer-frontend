import "./NavTab.css";
import { NavLink, Link, useNavigate } from "react-router-dom";

function NavTab({
  isloggedIn,
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

  const setAcive = ({ isActive }) => isActive ? 'header-menu__link-black header-menu__link-black_active' : 'header-menu__link-black';

  return (
    <div className="header-menu">
      <Link className="form__logo-link" to="/"><div className="header-menu__logo"></div></Link>
      {isloggedIn ? (
        <nav className="header-menu__nav header-menu__nav_not-landing">
          <div className="header-menu__links">
            <NavLink to="/movies" className={setAcive} >
              Фильмы
            </NavLink>
            <NavLink to="/saved-movies" className={setAcive} >
              Сохранённые фильмы
            </NavLink>
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
