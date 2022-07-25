import React from 'react'
import './Preloader.css'

function Preloader() {
  return (
    <>
      <div className="preloader preloader_active">
        <div className="preloader__container">
          <span className="preloader__round"></span>
        </div>
      </div>
      <p className="nothing nothing_active">Ничего не найдено</p>
    </>
  )
};

export default Preloader
