import "./Curtain.css";
import { Link, NavLink } from "react-router-dom";

function Curtain() {

  return (
    <div className="curtain">
      <div className="curtain__container">
        <button className="curtain__close"></button>
        <div className="curtain__links">
          <Link  to="/" className="curtain__link">Главная</Link>
          <NavLink  to="/movies" className="curtain__link curtain__link_active">Фильмы</NavLink>
          <NavLink  to="/saved-movies" className="curtain__link">Сохранённые фильмы</NavLink>
        </div>
        <button className="curtain__button-profile">Аккаунт</button>
      </div>
    </div>
  );
}

export default Curtain;
