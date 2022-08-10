import './SavedMovies.css';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import filterRequest from "../Movies/FilterRequest";
import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from "../Movies/Preloader/Preloader";
import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import apiServer from "../../utils/MainApi";

function SavedMovies({
  isloggedIn,
  updateViewCards,
  quantityCards,
  setQuantityCards,
  burger,
  onSaveCard,
  setSaveMovies,
  saveMovies
}) {
  const [textSearch, settextSearch] = useState('');
  const [findNothing, setFindNothing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputStatus, setInputStatus] = useState(false);
  const [checked, setChecked] = useState(false);

  function disableInput() {
    setInputStatus(true);
  }

  function enableInput() {
    setInputStatus(false);
  }

  function toggleChangeMovies(checked) {
    disableInput();
    setFindNothing(false);
    setLoading(true);
    if(!checked) {
      setSaveMovies(JSON.parse(localStorage.getItem('savedMovies')));
    } else {
      const result = filterRequest(saveMovies, '', checked)
      setSaveMovies(result);
    }
    setLoading(false);
    updateViewCards();
    enableInput();
  }

  function handlerSearchButton(str) {
    disableInput();
    setFindNothing(false);
    setLoading(true);
    apiServer.getMovies()
      .then((movies) => {
        const result = filterRequest(movies.data, str, checked)
        setSaveMovies(result)
        updateViewCards();
        if (result.length === 0) {
          setFindNothing(true);
        }
        setLoading(false);
        enableInput();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        enableInput();
      });
  }

  function handlerMoreButton() {
    let number = 0
    if (window.innerWidth > 1279) number = 4;
    if (window.innerWidth > 480 && window.innerWidth < 1280) number = 2;
    if (window.innerWidth > 319 && window.innerWidth < 481) number = 5;
    if (saveMovies.length < quantityCards + number) {
      setQuantityCards(saveMovies.length + 1)
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
        setChecked={setChecked}
        checked={checked}
        toggleChangeMovies={toggleChangeMovies}
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
        saveMovies={saveMovies}
        cards={saveMovies}
      />
    </div>
  );
}

export default SavedMovies;
