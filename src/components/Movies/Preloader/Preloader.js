import React from 'react'
import './Preloader.css'

function Preloader({ loading, findNothing }) {
  return (
    <>
      <div className={`preloader ${loading ? 'preloader_active':''}`}>
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
      <p className={`nothing ${findNothing ? 'nothing_active':''}`}>Ничего не найдено</p>
    </>
  )
};

export default Preloader
