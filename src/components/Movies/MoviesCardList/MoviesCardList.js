import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

function MoviesCardList({
  cards,
  quantityCards,
  onSaveCard,
  saveMovies,
  handlerMoreButton,

}) {

  let cardsNew = [];
  let tempArray = [];

  for (let index = 0; index < quantityCards; index++) {
    if (cards[index] !== undefined) {
      tempArray.push(cards[index]);
    }
  }
  cardsNew = tempArray;

  return (
    <>
      <section className='card-list'>
        {cardsNew.map((card, i) => (
          <MoviesCard
            key={card.id === undefined ? card._id : card.id}
            card={card}
            onSaveCard={onSaveCard}
            saveMovies={saveMovies}
          />
        ))}
      </section>
      <section className={`more ${cards.length > quantityCards ? 'more_active' : ''}`}>
        <button className="more__button" onClick={handlerMoreButton}>Ещё</button>
      </section>
    </>
  );
}

export default MoviesCardList;
