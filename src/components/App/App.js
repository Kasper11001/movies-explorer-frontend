import './App.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import apiServer from "../../utils/MainApi";
import api from "../../utils/MoviesApi";

import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Curtain from '../Main/Curtain/Curtain';
import filterRequest from "../Movies/FilterRequest";

function App() {

  const [isBurgerClick, setBurgerClick] = useState(false);
  const [quantityCards, setQuantityCards] = useState(0);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [findNothing, setFindNothing] = useState(false);
  const [isloggedIn, setloggedIn] = useState(false);
  const [findResult, setfindResult] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [currentUser, setcurrentUser] = useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      setfindResult(JSON.parse(localStorage.getItem('movies')));
      updateViewCards();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateViewCards);
    return () => {
      window.removeEventListener("resize", updateViewCards);
    };
  });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setloggedIn(true);
      setcurrentUser(JSON.parse(localStorage.getItem('user')));
      navigate('/movies', { replace: true });
    } else {
      getCurrentUser();
      navigate('/movies', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (isloggedIn === true) {
      apiServer.getMovies()
      .then((movies) =>{
        setSaveMovies(movies.data);
        localStorage.setItem('moviesSave', JSON.stringify(movies.data));
        updateViewCards();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [isloggedIn]);

  function updateViewCards() {
    if (window.innerWidth > 1279) setQuantityCards(12);
    if (window.innerWidth > 480 && window.innerWidth <1280) setQuantityCards(8);
    if (window.innerWidth > 319 && window.innerWidth < 481) setQuantityCards(5);
  }

  function burgerClick() {
    setBurgerClick(true);
  }

  function closeClick() {
    setBurgerClick(false);
  }

  function onLogin() {
    setloggedIn(true);
    navigate('/movies');
    getCurrentUser();
  }

  function getCurrentUser() {
    apiServer.getUserInfo()
    .then((user) => {
      setcurrentUser(user.data);
      localStorage.setItem('user', JSON.stringify({name: user.data.name, email: user.data.email}))
    })
    .catch((err) => {
      console.log(`Ошибка получения данных о пользователе: ${err}`);
    });
  }

  function logout() {
    apiServer.logout()
    .then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('movies');
      localStorage.removeItem('moviesAll');
      localStorage.removeItem('moviesSave');
      setfindResult([]);
      setSaveMovies([]);
      setloggedIn(false);
      setcurrentUser({
        name: "",
        email: "",
      });
      navigate('/signin', { replace: true });
      })
    .catch((err) =>
      console.log(`Ошибка: ${err}`)
    );
  }

  function toggleChangeMovies(status) {
    setChecked(status);
    setFindNothing(false);
    setLoading(true);
    if (localStorage.getItem('moviesAll') && localStorage.getItem('movies')) {
      const result = filterRequest(JSON.parse(localStorage.getItem('movies')),'',status)
      setfindResult(result);
      updateViewCards();
      if (result.length === 0) {
        setFindNothing(true);
      }
      setLoading(false);
    }
  }

  function toggleChangeMoviesSave(status) {
    setChecked(status);
    setFindNothing(false);
    setLoading(true);
    if (localStorage.getItem('moviesSave')) {
      const result = filterRequest(JSON.parse(localStorage.getItem('moviesSave')),'',status)
      setSaveMovies(result);
      updateViewCards();
      if (result.length === 0) {
        setFindNothing(true);
      }
      setLoading(false);
    }
  }

  function handlerSearchButton(str) {
    setFindNothing(false);
    setLoading(true);
    if (localStorage.getItem('moviesAll')) {
      const result = filterRequest(JSON.parse(localStorage.getItem('moviesAll')),str,checked)
      localStorage.setItem('movies', JSON.stringify(result));
      setfindResult(result);
      updateViewCards();
      if (result.length === 0) {
        setFindNothing(true);
      }
      setLoading(false);
    } else {
      api.getMovies()
      .then((movies) => {
        const result = filterRequest(movies, str, checked)
        localStorage.setItem('moviesAll', JSON.stringify(movies));
        localStorage.setItem('movies', JSON.stringify(result));
        setfindResult(result);
        updateViewCards();
        console.log(result);
        console.log('5');
        if (result.length === 0) {
          setFindNothing(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    }
  }

  function handlerSearchButtonSaveMovies(str) {
    setFindNothing(false);
    setLoading(true);
    apiServer.getMovies()
    .then((movies) => {
      const result = filterRequest(movies.data,str,checked)
      setSaveMovies(result);
      updateViewCards();
      if (result.length === 0) {
        setFindNothing(true);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }

  function handleSaveCard(movieTarget) {
    const statusMovie = 'owner' in movieTarget ? saveMovies.filter((movie) => movie._id === movieTarget._id) : saveMovies.filter((movie) => movie.movieId === movieTarget.id);
    if (statusMovie.length > 0) {
      apiServer.delMovie(statusMovie[0]._id)
      .then(() =>{
        const newArray = 'owner' in movieTarget ? saveMovies.filter((movie) => movie._id !== movieTarget._id) : saveMovies.filter((movie) => movie.movieId !== movieTarget.id);
        setSaveMovies(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      apiServer.addMovies(movieTarget)
      .then((newCard) => {
        setSaveMovies([...saveMovies, newCard.data]);
        localStorage.setItem('moviesSave', JSON.stringify([...saveMovies, newCard.data]));
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  function handlerMoreButton() {
    let number = 0
    if (window.innerWidth > 1279) number = 4;
    if (window.innerWidth > 480 && window.innerWidth <1280) number = 2;
    if (window.innerWidth > 319 && window.innerWidth < 481) number = 5;
    if (findResult.length < quantityCards + number) {
      setQuantityCards(findResult.length + 1)
    } else {
      setQuantityCards(quantityCards + number);
    }
}
  function profileEdit(name,email) {
    localStorage.setItem('user', JSON.stringify({name,email}))
    setcurrentUser({name,email});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className='page'>
      <Curtain
        burger={isBurgerClick}
        curtainClose={closeClick}
      />
      <Header burger={burgerClick}></Header>
      <Routes>
        <Route path="*" element={<PageNotFound />}/>
        <Route path="/movies" element={
          isloggedIn ?
            <Movies
              nothing={findNothing}
              loading={loading}
              searchButton={handlerSearchButton}
              checkbox={toggleChangeMovies}
              movies={findResult}
              saveMovies={saveMovies}
              cardsView ={quantityCards}
              more={handlerMoreButton}
              loggedIn={isloggedIn}
              onSaveCard={handleSaveCard}
              burger={burgerClick}
            /> : <Navigate to='/signin'/>
        }
        />
        <Route path="/saved-movies" element={
          isloggedIn ?
            <SavedMovies
              nothing={findNothing}
              loading={loading}
              // searchButton={handlerSearchButtonSaveMovies}
              checkbox={toggleChangeMoviesSave}
              saveMovies={saveMovies}
              cardsView ={quantityCards}
              more={handlerMoreButton}
              loggedIn={isloggedIn}
              onSaveCard={handleSaveCard}
              burger={burgerClick}
            /> : <Navigate to='/signin'/>
        }
        />
        <Route path="/profile" element={
          isloggedIn ?
            <Profile
              profileEdit={profileEdit}
              logout={logout}
              burger={burgerClick}
            /> : <Navigate to='/signin'/>
          }
        />
        <Route path="/signup" element={
          <Register
            onLogin={onLogin}
          />}
        />
        <Route path="/signin" element={
          <Login
            onLogin={onLogin}
          />}
        />
        <Route path="/" element={<Main/>}/>
      </Routes>
      <Footer></Footer>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
