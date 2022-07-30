import './SearchForm.css';
import { useState } from "react";

function SearchForm({ searchButton, checkbox }) {

  const [textSearch, settextSearch] = useState('');
  const [check, setcheck] = useState(false);

  function handleClickButton() {
    searchButton(textSearch);
  }

  function toggleChange() {
    checkbox(!check);
    setcheck(!check);
  }

  function handleChange(e) {
    settextSearch(e.target.value);
  }

  return (
    <section className='search'>
      <form className='search__form'>
          <div className='search__input-container'>
              <div  className='search__pic'></div>
              <input  className='search__input' value={textSearch} onChange={handleChange}  placeholder='Фильм' required></input>
              <button className='search__btn' onClick={handleClickButton} type='submit'></button>
          </div>
          <div className='search__btns'>
            <div className='search__item'></div>
            <label className='search__label'>
              <input className='search__invisible-checkbox' onChange={toggleChange} checked={check} type="checkbox" />
              <span className="search__visible-checkbox"></span>
              <span className="search__label-text">Короткометражки</span>
            </label>
          </div>
      </form>

    </section>
  );
}

export default SearchForm;
