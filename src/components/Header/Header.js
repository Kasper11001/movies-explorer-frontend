import React from "react";
import NavTab from '../NavTab/NavTab'
import './Header.css';


function Header({ burger, isloggedIn, isLanding }) {

  return (
    <>
      {isLanding ? (
        <header className='header header_landing'>
          <NavTab isloggedIn={isloggedIn} burger={burger} />
        </header>
      ):(
        <header className='header'>
          <NavTab isloggedIn={isloggedIn} burger={burger} />
        </header>
      )}

    </>
  );
}

export default Header;





