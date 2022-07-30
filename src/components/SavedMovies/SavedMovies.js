import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from "../Movies/Preloader/Preloader";

function SavedMovies({ checkbox, searchButton, onSaveCard, more, cardsView, saveMovies, nothing, loading }) {
  return (
    <div>
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
