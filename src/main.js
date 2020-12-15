import SiteProfileView from "./view/profile";
import SiteNavigationView from "./view/main-navigation";
import SiteSortView from "./view/sort-view";
import SiteFilmsBlockView from "./view/films-block-view";
import FilmView from "./view/film-view";
import ShowMoreButtonView from "./view/show-more";
import FooterStatisticsView from "./view/footer-statistics";
import PopupView from "./view/popup";
import NoFilmsView from "./view/no-films";
import {getMockArray} from "./mock/mock-data";
import {render, RenderPosition} from "./utils";

const FILM_CARDS_COUNT = 5;
const EXTRA_FILM_CARDS = 2;

const MOCK_FILMS_COUNT = 20;

const mockArray = getMockArray(MOCK_FILMS_COUNT);

const renderFilmsCard = (startCount, endCount, container, dataArray) => {
  for (let i = startCount; i < endCount; i++) {
    const filmData = dataArray[i];
    const filmComponent = new FilmView(filmData);
    render(container, filmComponent.getElement(), RenderPosition.BEFOREEND);

    filmComponent.setClickHandler(openPopup);
  }
};

const bodyElement = document.querySelector(`body`);
const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);
const footerElement = document.querySelector(`.footer`);

const openPopup = (evt) => {
  const target = evt.target.closest(`.film-card__title, .film-card__poster, .film-card__comments`);

  if (target) {
    bodyElement.classList.add(`hide-overflow`);
    removePopup();
    const filmId = target.parentElement.id;
    const film = mockArray.find((e) => String(e.id) === String(filmId));
    const popupComponent = new PopupView(film);

    bodyElement.appendChild(popupComponent.getElement());

    popupComponent.setClickCloseHandler(closePopup);
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
    bodyElement.classList.remove(`hide-overflow`);
    popup.remove();
  }
};

render(headerElement, new SiteProfileView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SiteNavigationView().getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SiteSortView().getElement(), RenderPosition.BEFOREEND);

if (mockArray.length) {
  render(mainElement, new SiteFilmsBlockView().getElement(), RenderPosition.BEFOREEND);

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

  const showMoreButtonComponent = new ShowMoreButtonView();
  render(filmsListElements[0], showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);
  render(footerElement, new FooterStatisticsView(mockArray.length).getElement(), RenderPosition.BEFOREEND);

  let countRenderedFilms = FILM_CARDS_COUNT;
  showMoreButtonComponent.setClickHandler(() => {
    if (countRenderedFilms < mockArray.length) {
      renderFilmsCard(countRenderedFilms, countRenderedFilms + FILM_CARDS_COUNT, filmsListContainer, mockArray);
      countRenderedFilms += FILM_CARDS_COUNT;
    }
    if (countRenderedFilms === mockArray.length) {
      showMoreButtonComponent.getElement().classList.add(`visually-hidden`);
    }
  });

} else {
  render(mainElement, new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
}

