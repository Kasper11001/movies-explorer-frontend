import { Route, Routes, Link } from 'react-router-dom';
import './Header.css';


function Header() {
  return (
    <Routes>
      <Route path="/profile" element={
        <header className='header'>
          <Link className='logo' to="/"></Link>
          <div className='header__container header__container_position_space-between'>
            <ul className='header__list'>
              <li className='header__link-item'>
                <Link className='header__link header__link_active' to="/movies">Фильмы</Link>
              </li>
              <li className='header__link-item'>
              <Link className='header__link' to="/saved-movies">Сохранённые фильмы</Link>
              </li>
            </ul>
            <button className='header__account-button'><Link className='header__account-button-text' to="/profile">Аккаунт</Link></button>
            <div className="header__burger"></div>
          </div>
        </header>
      }>
      </Route>
      <Route path="/movies" element={
        <header className='header'>
          <Link className='logo' to="/"></Link>
          <div className='header__container header__container_position_space-between'>
            <ul className='header__list'>
              <li className='header__link-item'>
                <Link className='header__link header__link_active' to="/movies">Фильмы</Link>
              </li>
              <li className='header__link-item'>
                <Link className='header__link' to="/saved-movies">Сохранённые фильмы</Link>
              </li>
            </ul>
            <button className='header__account-button'><Link className='header__account-button-text' to="/profile">Аккаунт</Link></button>
            <div className="header__burger"></div>
          </div>
        </header>
      }>
      </Route>
      <Route path="/saved-movies" element={
        <header className='header'>
          <Link className='logo' to="/"></Link>
          <div className='header__container header__container_position_space-between'>
            <ul className='header__list'>
              <li className='header__link-item'>
                <Link className='header__link header__link_active' to="/movies">Фильмы</Link>
              </li>
              <li className='header__link-item'>
                <Link className='header__link' to="/saved-movies">Сохранённые фильмы</Link>
              </li>
            </ul>
            <button className='header__account-button'><Link className='header__account-button-text' to="/profile">Аккаунт</Link></button>
            <div className="header__burger"></div>
          </div>
        </header>
      }>
      </Route>
      <Route path="/" element={
        <header className='header header_color_grey'>
        <Link className='logo' to="/"></Link>
        <div className='header__container header__container_position_flex-end'>
          <ul className='header__list'>
              <li className='header__list-item'>
                <button className='header__button'><Link className='header__button-text' to="/signup">Регистрация</Link></button>
              </li>
              <li className='header__list-item'>
                <button className='header__button header__button_colored'><Link className='header__button-text header__button-text_colored' to="/signin">Войти</Link></button>
              </li>
            </ul>
        </div>
        </header>
      }>
      </Route>
    </Routes>
  );
}

export default Header;





