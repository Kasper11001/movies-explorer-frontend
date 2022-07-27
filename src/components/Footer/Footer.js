import './Footer.css';
import { Route, Routes } from 'react-router-dom';

function Footer() {
  const date = new Date().getFullYear();
  return (
    <Routes>
      <Route path="/" element={
        <footer className="footer">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__container">
            <p className="footer__copyright">© {date}</p>
            <ul className="footer__links">
              <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://practicum.yandex.ru/">Яндекс.Практикум</a></li>
              <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://github.com//">Github</a></li>
              <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://Facebook.com/">Facebook</a></li>
            </ul>
          </div>
        </footer>
      }/>
      <Route path="/movies" element={
        <footer className="footer">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__container">
            <p className="footer__copyright">© {date}</p>
            <ul className="footer__links">
              <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://practicum.yandex.ru/">Яндекс.Практикум</a></li>
              <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://github.com//">Github</a></li>
              <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://Facebook.com/">Facebook</a></li>
            </ul>
          </div>
        </footer>
      }/>
      <Route path="/saved-movies" element={
        <footer className="footer">
          <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
          <div className="footer__container">
            <p className="footer__copyright">© {date}</p>
            <ul className="footer__links">
              <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://practicum.yandex.ru/">Яндекс.Практикум</a></li>
              <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://github.com//">Github</a></li>
              <li className="footer__link-container"><a className="footer__link" rel="noreferrer" target="_blank" href="https://Facebook.com/">Facebook</a></li>
            </ul>
          </div>
        </footer>
      }/>
    </Routes>
  );
}

export default Footer;
