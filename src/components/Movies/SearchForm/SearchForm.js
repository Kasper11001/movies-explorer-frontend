import './SearchForm.css';
import { useState } from "react";

function SearchForm({
  searchButton,
  inputStatus,
  checked,
  setChecked,
  toggleChangeMovies
}) {

  const [textSearch, settextSearch] = useState('');

  function handleClickButton(evt) {
    evt.preventDefault();
    searchButton(textSearch);
  }

  function handleChangeCheckbox() {
    setChecked(!checked);
    toggleChangeMovies(!checked);
  }

  function handleChange(e) {
    settextSearch(e.target.value);
  }

  return (
    <section className='search'>
      <form className='search__form'>
        <div className='search__input-container'>
          <div className='search__pic'></div>
          <input className='search__input' value={textSearch} onChange={handleChange} placeholder='Фильм' required disabled={inputStatus}></input>
          <button className='search__btn' onClick={handleClickButton}></button>
        </div>
        <div className='search__btns'>
          <div className='search__item'></div>
          <label className='search__label'>
            <input className='search__invisible-checkbox' onChange={handleChangeCheckbox} checked={checked} disabled={inputStatus} type="checkbox" />
            <span className="search__visible-checkbox"></span>
            <span className="search__label-text">Короткометражки</span>
          </label>
        </div>
      </form>

    </section>
  );
}

export default SearchForm;
