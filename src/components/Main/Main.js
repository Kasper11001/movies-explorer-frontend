import './Main.css';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Techs from './Techs/Techs';
import AboutProject from './AboutProject/AboutProject';
import Promo from './Promo/Promo';

function Main() {
  return (
    <main className="main">
      <Promo></Promo>
      <AboutProject></AboutProject>
      <Techs></Techs>
      <AboutMe></AboutMe>
      <Portfolio></Portfolio>
    </main>
  );
}

export default Main;
