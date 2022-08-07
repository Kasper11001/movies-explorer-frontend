import './App.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import apiServer from "../../utils/MainApi";
import api from "../../utils/MoviesApi";

import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
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
  const [loading, setLoading] = useState(false);
  const [findNothing, setFindNothing] = useState(false);
  const [isloggedIn, setloggedIn] = useState(false);
  const [findResult, setfindResult] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [inputStatus, setInputStatus] = useState(false);
  const [checked, setChecked] = useState(false);

  const [currentUser, setcurrentUser] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('movies')) {
      setChecked(getCheckBoxStatus);
      setfindResult(JSON.parse(localStorage.getItem('movies')));
    }
    updateViewCards();
  }, []);

  useEffect(() => {
    if (isloggedIn === true) {
      api.getMovies()
        .then((movies) => {
          localStorage.setItem('moviesAll', JSON.stringify(movies));
        })
        .catch((err) => console.log(err))
    }
  }, [isloggedIn]);

  useEffect(() => {
    window.addEventListener("resize", updateViewCards);
    return () => {
      window.removeEventListener("resize", updateViewCards);
    };
  });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setloggedIn(true);
      setcurrentUser(getUser);
    } else {
      getCurrentUser();
    }
    navigate("/movies");
  }, []);

  useEffect(() => {
    if (isloggedIn === true) {
      apiServer.getMovies()
        .then((movies) => {
          setSaveMovies(movies.data);
          localStorage.setItem('moviesSave', JSON.stringify(movies.data));
          updateViewCards();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isloggedIn]);

  function getSavedMovies() {
    if (localStorage.getItem('moviesSave')) {
      apiServer.getMovies()
        .then((movies) => {
          setSaveMovies(movies.data);
          updateViewCards();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getCheckBoxStatus() {
    const checkbosStatus = JSON.parse(localStorage.getItem('checkboxStatus'));
    return checkbosStatus;
  }

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
    setloggedIn(true);
    navigate('/movies');
    getCurrentUser();
  }

  function getCurrentUser() {
    apiServer.getUserInfo()
      .then((user) => {
        setloggedIn(true);
        setcurrentUser(user.data);
        localStorage.setItem('user', JSON.stringify({ name: user.data.name, email: user.data.email }))
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
        localStorage.removeItem('checkboxStatus');
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

  function toggleChangeMovies(checked) {
    disableInput();
    setFindNothing(false);
    setLoading(true);
    if (localStorage.getItem('movies')) {
      const result = filterRequest(JSON.parse(localStorage.getItem('movies')), '', checked)
      setfindResult(result);
    }
    if (localStorage.getItem('moviesSave')) {
      const result = filterRequest(JSON.parse(localStorage.getItem('moviesSave')), '', checked)
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
    const result = filterRequest(JSON.parse(localStorage.getItem('moviesAll')), str, checked)
    localStorage.setItem('movies', JSON.stringify(result));
    localStorage.setItem('checkboxStatus', JSON.stringify(checked));
    setfindResult(result);
    updateViewCards();
    if (result.length === 0) {
      setFindNothing(true);
    }
    setLoading(false);
    enableInput();
  }

  function handlerSearchButtonSaveMovies(str) {
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
    if (window.innerWidth > 480 && window.innerWidth < 1280) number = 2;
    if (window.innerWidth > 319 && window.innerWidth < 481) number = 5;
    if (findResult.length < quantityCards + number) {
      setQuantityCards(findResult.length + 1)
    } else {
      setQuantityCards(quantityCards + number);
    }
  }

  function profileEdit(name, email) {
    localStorage.setItem('user', JSON.stringify({ name, email }))
    setcurrentUser({ name, email });
  }

  function disableInput() {
    setInputStatus(true);
  }

  function enableInput() {
    setInputStatus(false);
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
          <Route path="/" element={<Main isLanding={true} loggedIn={isloggedIn} burger={burgerClick} />} />
          <Route path="*" element={<PageNotFound />} />
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
          <Route path="/movies" element={
            isloggedIn ?
              <Movies
                toggleChangeMovies={toggleChangeMovies}
                setChecked={setChecked}
                checked={checked}
                inputStatus={inputStatus}
                nothing={findNothing}
                loading={loading}
                searchButton={handlerSearchButton}
                movies={findResult}
                saveMovies={saveMovies}
                cardsView={quantityCards}
                more={handlerMoreButton}
                loggedIn={isloggedIn}
                onSaveCard={handleSaveCard}
                burger={burgerClick}
              /> : <Navigate to='/' />
          }
          />
          <Route path="/saved-movies" element={
            isloggedIn ?
              <SavedMovies
                setChecked={setChecked}
                checked={checked}
                toggleChangeMovies={toggleChangeMovies}
                getSavedMovies={getSavedMovies}
                searchButton={handlerSearchButtonSaveMovies}
                inputStatus={inputStatus}
                nothing={findNothing}
                loading={loading}
                saveMovies={saveMovies}
                cardsView={quantityCards}
                more={handlerMoreButton}
                loggedIn={isloggedIn}
                onSaveCard={handleSaveCard}
                burger={burgerClick}
              /> : <Navigate to='/' />
          }
          />
          <Route path="/profile" element={
            isloggedIn ?
              <Profile
                loggedIn={isloggedIn}
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
