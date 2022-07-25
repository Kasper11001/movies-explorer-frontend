import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__link">
        <a className="portfolio__link-text" href="#" target="_blank" rel="noreferrer">Статичный сайт</a>
        <div className="portfolio__link-image"></div>
      </div>
      <div className="portfolio__link">
        <a className="portfolio__link-text" href="#" target="_blank" rel="noreferrer">Адаптивный сайт</a>
        <div className="portfolio__link-image"></div>
      </div>
      <div className="portfolio__link">
        <a className="portfolio__link-text" href="#" target="_blank" rel="noreferrer">Одностраничное приложение</a>
        <div className="portfolio__link-image"></div>
      </div>
    </section>
  );
}

export default Portfolio;
