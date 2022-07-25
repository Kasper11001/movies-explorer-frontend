import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project'>
      <h2 className='section-title'>О проекте</h2>
      <div className='about-project__text'>
        <div className='about-project__text-container'>
          <p className='about-project__text-title'>Дипломный проект включал 5 этапов</p>
          <p className='about-project__text-subtitle'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__text-container'>
          <p className='about-project__text-title'>На выполнение диплома ушло 5 недель</p>
          <p className='about-project__text-subtitle'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="progress">
        <div className="progress__backend">
          <p className="progress__bar-text">1 неделя</p>
        </div>
        <div className="progress__frontend">
          <p className="progress__bar-text">4 недели</p>
        </div>
        <p className="progress__text">Back-end</p>
        <p className="progress__text">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
