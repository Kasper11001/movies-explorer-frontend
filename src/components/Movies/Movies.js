import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import Header from '../Header/Header';

function Movies({
  toggleChangeMovies,
  inputStatus,
  saveMovies,
  onSaveCard,
  more,
  cardsView,
  movies,
  nothing,
  loading,
  searchButton,
  burger,
  loggedIn,
  checked,
  setChecked
}) {

  return (
    <div>
      <Header
        burger={burger}
        loggedIn={loggedIn}
      />
      <SearchForm
        toggleChangeMovies={toggleChangeMovies}
        setChecked={setChecked}
        checked={checked}
        inputStatus={inputStatus}
        searchButton={searchButton}
      />
      <Preloader
        nothing={nothing}
        loading={loading}
      />
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
