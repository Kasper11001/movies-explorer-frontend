import "./Curtain.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Curtain({ burger, curtainClose }) {

  const navigate = useNavigate();

  const setAcive = ({ isActive }) => isActive ? 'curtain__link curtain__link_active' : 'curtain__link';

  function handleButtonClickProf() {
    navigate('/profile', { replace: true });
    curtainClose();
  }


  return (
    <div className={`curtain ${burger ? "curtain_active": ""}`}>
      <div className="curtain__container">
        <button className="curtain__close" onClick={curtainClose} type="button"></button>
        <div className="curtain__links">
          <Link  to="/" className="curtain__link" onClick={curtainClose}>Главная</Link>
          <NavLink  to="/movies" className={setAcive} onClick={curtainClose}>Фильмы</NavLink>
          <NavLink  to="/saved-movies" className={setAcive} onClick={curtainClose}>Сохранённые фильмы</NavLink>
        </div>
        <button className="curtain__button-profile" onClick={handleButtonClickProf} type="button">Аккаунт</button>
      </div>
    </div>
  );
}

export default Curtain;
