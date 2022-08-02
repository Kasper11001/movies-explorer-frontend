import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import React from "react";

function MoviesCardList({ cards, cardsView, onSaveCard, saveMovies, more }) {

  let cardsNew = [];
  let tempArray = [];

    for (let index = 0; index < cardsView; index++) {
      if (cards[index] !== undefined) {
        tempArray.push(cards[index]);
      }
    }
    cardsNew = tempArray;

  return (
    <>
      <section className='card-list'>
        {cardsNew.map((data, i) => (
        <MoviesCard
          key={data.id === undefined ? data._id : data.id}
          card={data}
          onSaveCard={onSaveCard}
          saveMovies={saveMovies}
        />
        ))}
      </section>
      <section className={`more ${cards.length > cardsView ? 'more_active' : ''}`}>
        <button className="more__button" onClick={more}>Ещё</button>
      </section>
    </>
  );
}

export default MoviesCardList;
