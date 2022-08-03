import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import Header from '../Header/Header';

function Movies({ saveMovies, onSaveCard, more, cardsView, movies, nothing, loading, checkbox, searchButton, burger, loggedIn }) {
  return (
    <div>
      <Header
        burger={burger}
        loggedIn={loggedIn}
        />
      <SearchForm
        checkbox={checkbox}
        searchButton={searchButton}
      />
      <Preloader nothing={nothing} loading={loading}/>
      <MoviesCardList
        saveMovies={saveMovies}
        onSaveCard={onSaveCard}
        more={more}
        cardsView={cardsView}
        cards={movies}
      />
    </div>
  );
}

export default Movies;
