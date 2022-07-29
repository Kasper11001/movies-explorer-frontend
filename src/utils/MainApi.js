class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getMovies() {
    return fetch(`${this.baseUrl}/movies`, {
      credentials: 'include',
      headers: this.headers,
    }).then(this._getResponseData);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      credentials: 'include',
      headers: this.headers,
    }).then(this._getResponseData);
  }

  register(name, password, email) {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({ name, password, email })
    }).then(this._getResponseData);
  }

  login(password, email) {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({ password, email })
    }).then(this._getResponseData);
  }

  logout() {
    return fetch(`${this.baseUrl}/signout`, {
      method: "POST",
      credentials: 'include',
      headers: this.headers,
    }).then(this._getResponseData);
  }

  editProfile(name, email) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({ name, email })
    }).then(this._getResponseData);
  }

  addMovies(card) {
    const linkTest = /^http/;
    if (!linkTest.test(card.trailerLink)) card.trailerLink = 'https://api.penoto.nomoredomains.club/not-found';
    if (card.country === null) card.country = 'none';
    if (card.nameEN === null || card.nameEN === "") card.nameEN = 'none';
    if (card.director === null) card.director = 'none';
    const {
      country,
      director,
      duration,
      year,
      description,
      nameRU,
      nameEN,
    } = card;
    const thumbnail = `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`;
    const image = `https://api.nomoreparties.co${card.image.url}`;
    const trailer = card.trailerLink;
    const movieId = card.id;
    return fetch(`${this.baseUrl}/movies/`, {
      method: "POST",
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        nameRU,
        nameEN,
        thumbnail,
        image,
        trailer,
        movieId,
       })
    }).then(this._getResponseData);
  }


  delMovie(movieId) {
    return fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this.headers,
    }).then(this._getResponseData);
  }
}
// конфиг api
const apiConfig = {
  // baseUrl: "https://VasilyVasiliev1.nomoreparties.sbs",
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
};
//экспорт api
const apiServer = new Api(apiConfig);
export default apiServer;
