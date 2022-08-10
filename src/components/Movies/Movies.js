import './Movies.css';
import filterRequest from "./FilterRequest";
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import Header from '../Header/Header';
import { useState, useEffect } from 'react';

function Movies({
  isloggedIn,
  updateViewCards,
  quantityCards,
  setQuantityCards,
  burger,
  onSaveCard,
  findResult,
  setfindResult,
  saveMovies,

}) {

  const [findNothing, setFindNothing] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputStatus, setInputStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [textSearch, settextSearch] = useState('');

  useEffect(() => {

    if (localStorage.getItem('movies')) {
      if (!JSON.parse(localStorage.getItem('checkboxMovies'))) {
        setChecked(JSON.parse(localStorage.getItem('checkboxMovies')));
        setfindResult(JSON.parse(localStorage.getItem('movies')));
      }
      const checked = JSON.parse(localStorage.getItem('checkboxMovies'));
      setChecked(checked);
      const result = filterRequest(JSON.parse(localStorage.getItem('movies')), '', checked)
      setfindResult(result);
    }
    if (localStorage.getItem('searchText')) {
      settextSearch(JSON.parse(localStorage.getItem('searchText')));
    }
    updateViewCards();
  }, []);

  function handlerSearchButton(str) {
    disableInput();
    setFindNothing(false);
    setLoading(true);
    const result = filterRequest(JSON.parse(localStorage.getItem('moviesAll')), str, checked);
    localStorage.setItem('movies', JSON.stringify(result));
    localStorage.setItem('checkboxMovies', JSON.stringify(checked));
    localStorage.setItem('searchText', JSON.stringify(str));
    setfindResult(result);
    updateViewCards();
    if (result.length === 0) {
      setFindNothing(true);
    }
    setLoading(false);
    enableInput();
  }

  function toggleChangeMovies(checked) {
    localStorage.setItem('checkboxMovies', JSON.stringify(checked));
    disableInput();
    setFindNothing(false);
    setLoading(true);
    const result = filterRequest(JSON.parse(localStorage.getItem('moviesAll')), textSearch, checked);
    localStorage.setItem('movies', JSON.stringify(result));
    setfindResult(result);
    setLoading(false);
    updateViewCards();
    enableInput();
  }

  function disableInput() {
    setInputStatus(true);
  }

  function enableInput() {
    setInputStatus(false);
  }

  function handlerMoreButton() {
    let number = 0
    if (window.innerWidth > 1279) number = 4;
    if (window.innerWidth > 480 && window.innerWidth < 1280) number = 2;
    if (window.innerWidth > 319 && window.innerWidth < 481) number = 5;
    if (findResult.length < quantityCards + number) {
      setQuantityCards(findResult.length + 1)
    } else {
      setQuantityCards(quantityCards + number);
    }
  }

  return (
    <div>
      <Header
        isloggedIn={isloggedIn}
        burger={burger}
      />
      <SearchForm
        toggleChangeMovies={toggleChangeMovies}
        setChecked={setChecked}
        checked={checked}
        inputStatus={inputStatus}
        searchButton={handlerSearchButton}
        textSearch={textSearch}
        settextSearch={settextSearch}
      />
      <Preloader
        findNothing={findNothing}
        loading={loading}
      />
      <MoviesCardList
        onSaveCard={onSaveCard}
        handlerMoreButton={handlerMoreButton}
        quantityCards={quantityCards}
        cards={findResult}
        saveMovies={saveMovies}
      />
    </div>
  );
}

export default Movies;
