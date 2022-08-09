import './App.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import api from "../../utils/MoviesApi";
import apiServer from "../../utils/MainApi";

import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import Curtain from '../Main/Curtain/Curtain';

function App() {

  const [findResult, setfindResult] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [isBurgerClick, setBurgerClick] = useState(false);
  const [isloggedIn, setloggedIn] = useState(false);
  const [quantityCards, setQuantityCards] = useState(0);
  const [currentUser, setcurrentUser] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setcurrentUser(getUser);
      setloggedIn(true);
      getSavedMovies();
      if (localStorage.getItem('moviesAll')) {
        setfindResult(JSON.parse(localStorage.getItem('movies')));
      } else {
        api.getMovies()
          .then((movies) => {
            setfindResult(movies)
            localStorage.setItem('moviesAll', JSON.stringify(movies));
            localStorage.setItem('movies', JSON.stringify(movies));
          })
          .catch((err) => console.log(err))
      }
    } else {
      getCurrentUser();
    }
  }, [isloggedIn]);

  useEffect(() => {
    window.addEventListener("resize", updateViewCards);
    return () => {
      window.removeEventListener("resize", updateViewCards);
    };
  });

  function updateViewCards() {
    if (window.innerWidth > 1279) setQuantityCards(12);
    if (window.innerWidth > 480 && window.innerWidth < 1280) setQuantityCards(8);
    if (window.innerWidth > 319 && window.innerWidth < 481) setQuantityCards(5);
  }

  function burgerClick() {
    setBurgerClick(true);
  }

  function closeClick() {
    setBurgerClick(false);
  }

  function onLogin() {
    getCurrentUser();
    navigate('/movies');
  }

  function handleSaveCard(movieTarget) {
    const statusMovie = 'owner' in movieTarget ? saveMovies.filter((movie) => movie._id === movieTarget._id) : saveMovies.filter((movie) => movie.movieId === movieTarget.id);
    if (statusMovie.length > 0) {
      apiServer.delMovie(statusMovie[0]._id)
        .then(() => {
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getCurrentUser() {
    apiServer.getUserInfo()
      .then((user) => {
        localStorage.setItem('user', JSON.stringify({ name: user.data.name, email: user.data.email }))
        setcurrentUser(user.data);
        setloggedIn(true);
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
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('checkboxMovies');
        localStorage.removeItem('searchText');
        setfindResult([]);
        setSaveMovies([]);
        setloggedIn(false);
        setcurrentUser({
          name: "",
          email: "",
        });
        navigate('/', { replace: true });
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`)
      );
  }

  function getSavedMovies() {
    apiServer.getMovies()
      .then((movies) => {
        setSaveMovies(movies.data);
        updateViewCards();
        localStorage.setItem('savedMovies', JSON.stringify(movies.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function profileEdit(name, email) {
    localStorage.setItem('user', JSON.stringify({ name, email }))
    setcurrentUser({ name, email });
  }

  function getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Curtain
          burger={isBurgerClick}
          curtainClose={closeClick}
        />
        <Routes>
          <Route path="/" element={<Main isLanding={true} isloggedIn={isloggedIn} burger={burgerClick} />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/signup" element={
            isloggedIn ?
              <Navigate to='/' /> :
              <Register
                onLogin={onLogin}
              />}
          />
          <Route path="/signin" element={
            isloggedIn ?
              <Navigate to='/' /> :
              <Login
                onLogin={onLogin}
              />}
          />
          <Route path="/movies" element={
            isloggedIn ?
              <Movies
                findResult={findResult}
                setfindResult={setfindResult}
                onSaveCard={handleSaveCard}
                isloggedIn={isloggedIn}
                updateViewCards={updateViewCards}
                quantityCards={quantityCards}
                setQuantityCards={setQuantityCards}
                burger={burgerClick}
                saveMovies={saveMovies}
              /> : <Navigate to='/' />
          }
          />
          <Route path="/saved-movies" element={
            isloggedIn ?
              <SavedMovies
                findResult={findResult}
                saveMovies={saveMovies}
                setSaveMovies={setSaveMovies}
                onSaveCard={handleSaveCard}
                isloggedIn={isloggedIn}
                updateViewCards={updateViewCards}
                quantityCards={quantityCards}
                setQuantityCards={setQuantityCards}
                burger={burgerClick}
              /> : <Navigate to='/' />
          }
          />
          <Route path="/profile" element={
            isloggedIn ?
              <Profile
                isloggedIn={isloggedIn}
                profileEdit={profileEdit}
                logout={logout}
                burger={burgerClick}
              /> : <Navigate to='/' />
          }
          />
        </Routes>
        <Footer></Footer>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
