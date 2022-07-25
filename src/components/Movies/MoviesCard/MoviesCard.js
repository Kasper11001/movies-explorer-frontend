import './MoviesCard.css';

function MoviesCard({ src, title, duration }) {
  return (
    <div className='card'>
      <button className='card__delete-icon'></button>
      <img className='card__image' src={src} alt='обложка фильма' />
      <div className='card__info'>
        <p className='card__title'>{title}</p>
        <p className='card__duration'>{duration}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
