import {createProfile} from "./view/profile";
import {createMainNavigation} from "./view/mainNavigation";
import {createSiteSort} from "./view/sort";
import {createFilms} from "./view/films";
import {createFilmsCard} from "./view/filmsCard";
import {createShowMoreButton} from "./view/showMore";
import {createFooterStatistics} from "./view/footerStatistics";
import {createSitePopup} from "./view/popup";
import {getMockArray} from "./mock/mockData";

const FILM_CARDS_COUNT = 5;
const EXTRA_FILM_CARDS = 2;

const MOCK_FILMS_COUNT = 20;

const mockArray = getMockArray(MOCK_FILMS_COUNT);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilmsCard = (startCount, endCount, container, dataArray) => {
  for (let i = startCount; i < endCount; i++) {
    const filmData = dataArray[i];
    render(container, createFilmsCard(filmData), `beforeend`);
    const filmCard = container.querySelector(`#${filmData.id}`);

    filmCard.addEventListener(`click`, (evt) => {
      openPopup(evt);
    });
  }
};

const openPopup = (evt) => {
  const target = evt.target.closest(`.film-card__title, .film-card__poster, .film-card__comments`);

  if (target) {
    removePopup();
    const filmId = target.parentElement.id;
    const film = mockArray.find((e) => String(e.id) === String(filmId));
    render(bodyElement, createSitePopup(film), `beforeend`);

    const filmPopup = bodyElement.querySelector(`.film-details__close-btn`);

    filmPopup.addEventListener(`click`, () => {
      closePopup();
    });
    document.addEventListener(`keydown`, popupEscPressHandler);
  }
};

const popupEscPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const closePopup = () => {
  removePopup();
  document.removeEventListener(`keydown`, popupEscPressHandler);
};

const removePopup = () => {
  const popup = document.querySelector(`.film-details`);
  if (popup) {
    popup.remove();
  }
};

const bodyElement = document.querySelector(`body`);
const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);

render(headerElement, createProfile(), `beforeend`);
render(mainElement, createMainNavigation(), `beforeend`);
render(mainElement, createSiteSort(), `beforeend`);
render(mainElement, createFilms(), `beforeend`);

const filmsListElements = mainElement.querySelectorAll(`.films-list`);
const filmsListContainer = filmsListElements[0].querySelector(`.films-list__container`);
const topRatedContainer = filmsListElements[1].querySelector(`.films-list__container`);
const mostCommentedContainer = filmsListElements[2].querySelector(`.films-list__container`);

renderFilmsCard(0, FILM_CARDS_COUNT, filmsListContainer, mockArray);


const topRatedArray = mockArray.slice().sort((a, b) => {
  return b.rating - a.rating;
});
const mostCommentedArray = mockArray.slice().sort((a, b) => {
  return b.comments.length - a.comments.length;
});

renderFilmsCard(0, EXTRA_FILM_CARDS, topRatedContainer, topRatedArray);
renderFilmsCard(0, EXTRA_FILM_CARDS, mostCommentedContainer, mostCommentedArray);

render(filmsListElements[0], createShowMoreButton(), `beforeend`);
render(footerElement, createFooterStatistics(mockArray.length), `beforeend`);


const showMoreButton = document.querySelector(`.films-list__show-more`);
let countRenderedFilms = FILM_CARDS_COUNT;
showMoreButton.addEventListener(`click`, () => {
  if (countRenderedFilms < mockArray.length) {
    renderFilmsCard(countRenderedFilms, countRenderedFilms + FILM_CARDS_COUNT, filmsListContainer, mockArray);
    countRenderedFilms += FILM_CARDS_COUNT;
  }
  if (countRenderedFilms === mockArray.length) {
    showMoreButton.classList.add(`visually-hidden`);
  }
});
