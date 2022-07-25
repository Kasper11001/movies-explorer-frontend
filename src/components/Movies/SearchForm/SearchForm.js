import './SearchForm.css';

function SearchForm() {
  return (
    <section className='search'>
      <form className='search__form'>
          <div className='search__input-container'>
              <div  className='search__pic'></div>
              <input  className='search__input'  placeholder='Фильм'></input>
              <button className='search__btn' type='submit'></button>
          </div>
          <div className='search__btns'>
            <div className='search__item'></div>
            <label className='search__label'>
              <input className='search__invisible-checkbox' type="checkbox" />
              <span className="search__visible-checkbox"></span>
              <span className="search__label-text">Короткометражки</span>
            </label>
          </div>
      </form>

    </section>
  );
}

export default SearchForm;
