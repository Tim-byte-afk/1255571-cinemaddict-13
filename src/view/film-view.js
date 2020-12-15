import AbstractView from "./abstract.js";

const MAX_DESC_COUNT = 140;
const DESC_COUNT_FOR_LABEL = 139;

const createFilmsCard = (film) => {
  const commentsLabel = film.comments.length === 1 ? `comment` : `comments`;
  const description = film.description.length > MAX_DESC_COUNT ? `` + film.description.substring(0, DESC_COUNT_FOR_LABEL) + `...` : film.description;

  return `<article id="${film.id}" class="film-card">
    <h3 class="film-card__title">${film.filmTitle}</h3>
    <p class="film-card__rating">${film.rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${film.releaseDate}</span>
      <span class="film-card__duration">${film.runtime}</span>
      <span class="film-card__genre">${film.genres[0]}</span>
    </p>
    <img src="${film.posterImage}" alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${film.comments.length} ${commentsLabel}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmView extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmsCard(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    this._callback.click(evt);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
