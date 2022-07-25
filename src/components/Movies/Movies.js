import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

function Movies() {
  return (
    <div>
      <SearchForm></SearchForm>
      <MoviesCardList></MoviesCardList>
    </div>
  );
}

export default Movies;