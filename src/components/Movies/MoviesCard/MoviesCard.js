import './MoviesCard.css';

function MoviesCard({ card, onSaveCard, saveMovies }) {

  const hour = Math.floor(card.duration/60);
  const minute = (card.duration - hour*60);
  const trailer = card.trailer === undefined ? card.trailerLink : card.trailer;
  const image =   card.image.url ? `https://api.nomoreparties.co${card.image.url}` : card.image;
  const owner = card.owner ? true : false;
  const cardIcon = card.owner === undefined ? saveMovies.filter((movie) => movie.movieId === card.id) : [];

  function handleSaveClick() {
    onSaveCard(card)
  }

  return (
    <div className='card'>
      <button
        className={`${owner ? "card__delete-icon" : "card__save-icon"} ${cardIcon.length > 0 ? "card__save-icon_active" : ""}`}
        onClick={handleSaveClick}
        type="button">
     </button>
      <a href={trailer} target="_blank" rel="noreferrer">
        <img className="card__image" src={image} alt={card.nameRU}/>
      </a>
      <div className='card__info'>
        <p className='card__title'>{card.nameRU}</p>
        <p className='card__duration'>{`${hour}ч${minute}м`}</p>
      </div>
    </div>
  );
}

export default MoviesCard;
