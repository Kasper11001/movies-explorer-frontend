import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <a className="portfolio__link" href="https://kasper11001.github.io/how-to-learn/" target="_blank" rel="noreferrer">
        <p className='portfolio__link-text'>Статичный сайт</p>
        <div className="portfolio__link-image"></div>
      </a>
      <a className="portfolio__link" href="https://kasper11001.github.io/russian-travel/" target="_blank" rel="noreferrer">
        <p className='portfolio__link-text'>Адаптивный сайт</p>
        <div className="portfolio__link-image"></div>
      </a>
      <a className="portfolio__link" href="https://kasper11001.github.io/mesto/" target="_blank" rel="noreferrer">
        <p className='portfolio__link-text'>Одностраничное приложение</p>
        <div className="portfolio__link-image"></div>
      </a>
    </section>
  );
}

export default Portfolio;
