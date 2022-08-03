import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from "../Movies/Preloader/Preloader";
import Header from '../Header/Header';

function SavedMovies({ checkbox, searchButton, onSaveCard, more, cardsView, saveMovies, nothing, loading, burger, loggedIn }) {
  return (
    <div>
      <Header loggedIn={loggedIn} burger={burger}/>
      <SearchForm
        checkbox={checkbox}
        searchButton={searchButton}
      />
      <Preloader
        nothing={nothing}
        loading={loading}

      />
      <MoviesCardList
        onSaveCard={onSaveCard}
        more={more}
        cardsView={cardsView}
        cards={saveMovies}
      />
    </div>
  );
}

export default SavedMovies;
