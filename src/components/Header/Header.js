import React from "react";
import NavTab from '../NavTab/NavTab'
import './Header.css';


function Header({ burger, loggedIn, isLanding }) {

  return (
    <>
      {isLanding ? (
        <header className='header header_landing'>
          <NavTab loggedIn={loggedIn} burger={burger} />
        </header>
      ):(
        <header className='header'>
          <NavTab loggedIn={loggedIn} burger={burger} />
        </header>
      )}

    </>
  );
}

export default Header;





