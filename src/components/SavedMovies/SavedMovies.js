import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from "../Movies/Preloader/Preloader";
import Header from '../Header/Header';

function SavedMovies({
  toggleChangeMovies,
  inputStatus,
  searchButton,
  onSaveCard,
  more,
  cardsView,
  saveMovies,
  nothing,
  loading,
  burger,
  loggedIn,
  setChecked,
  checked
}) {


  return (
    <div>
      <Header
        loggedIn={loggedIn}
        burger={burger}
      />
      <SearchForm
        setChecked={setChecked}
        checked={checked}
        toggleChangeMovies={toggleChangeMovies}
        inputStatus={inputStatus}
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
