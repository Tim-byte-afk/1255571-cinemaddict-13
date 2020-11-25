import {createProfile} from "./view/profile";
import {createMainNavigation} from "./view/mainNavigation";
import {createSiteSort} from "./view/sort";
import {createFilms} from "./view/films";
import {createFilmsCard} from "./view/filmsCard";
import {createShowMoreButton} from "./view/showMore";
import {createFooterStatistics} from "./view/footerStatistics";
import {createSitePopup} from "./view/popup";

const FILM_CARDS_COUNT = 5;
const EXTRA_FILM_CARDS = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderFilmsCard = (count, container) => {
  for (let i = 0; i < count; i++) {
    render(container, createFilmsCard(), `beforeend`);
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

const filmsList = mainElement.querySelectorAll(`.films-list`);
const filmsListContainerOne = filmsList[0].querySelector(`.films-list__container`);
const filmsListContainerTwo = filmsList[1].querySelector(`.films-list__container`);
const filmsListContainerThree = filmsList[2].querySelector(`.films-list__container`);

renderFilmsCard(FILM_CARDS_COUNT, filmsListContainerOne);
renderFilmsCard(EXTRA_FILM_CARDS, filmsListContainerTwo);
renderFilmsCard(EXTRA_FILM_CARDS, filmsListContainerThree);

render(filmsList[0], createShowMoreButton(), `beforeend`);
render(footerElement, createFooterStatistics(), `beforeend`);
render(bodyElement, createSitePopup(), `beforeend`);

const filmDetailsPopup = document.querySelector(`.film-details`);
filmDetailsPopup.classList.add(`visually-hidden`);
