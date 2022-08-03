import './Main.css';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Techs from './Techs/Techs';
import AboutProject from './AboutProject/AboutProject';
import Promo from './Promo/Promo';
import Header from '../Header/Header';

function Main({ burger, loggedIn, isLanding }) {
  return (
    <main className="main">
      <Header isLanding={isLanding} loggedIn={loggedIn} burger={burger} />
      <Promo />
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </main>
  );
}

export default Main;
