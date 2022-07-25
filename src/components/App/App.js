import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
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


function App() {
  const loggedIn = true;
  return (
    <div className='page'>
      <Curtain></Curtain>
      <Header></Header>
      <Routes>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/saved-movies" element={<SavedMovies />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/signup" element={<Register />}/>
        <Route path="/signin" element={<Login />}/>
        <Route path="/" element={loggedIn ? <Main/> : <Navigate to="/signin" />}/>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
