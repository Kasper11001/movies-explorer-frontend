import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import img1 from '../../../images/card-image1.png'
import img2 from '../../../images/card-image2.png'
import img3 from '../../../images/card-image3.png'

function MoviesCardList() {
  return (
    <>
      <section className='card-list'>
        <MoviesCard
          src={img1}
          title={'33 слова о дизайне'}
          duration={'1ч 17м'}
        >
        </MoviesCard>
        <MoviesCard
          src={img2}
          title={'Киноальманах «100 лет дизайна»'}
          duration={'1ч 17м'}
        >
        </MoviesCard>
        <MoviesCard
          src={img3}
          title={'В погоне за Бенкси'}
          duration={'1ч 17м'}
        >
        </MoviesCard>
      </section>
      <section className="more card-list__more more_active">
        <button className="more__button">Ещё</button>
      </section>
    </>
  );
}

export default MoviesCardList;
