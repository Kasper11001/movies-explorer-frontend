import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

function SavedMovies() {
  return (
    <div>
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
    </div>
  );
}

export default SavedMovies;
