import {shuffle, getRandomInt} from "../utils";

const MIN_RATING = 0;
const MAX_RATING = 9;

const MIN_WRITERS = 1;
const MAX_WRITERS = 3;

const MIN_ACTORS = 1;
const MAX_ACTORS = 3;

const MIN_DESC_COUNT = 1;
const MAX_DESC_COUNT = 5;

const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 5;

const MIN_MINUTS = 10;
const MAX_MINUTS = 59;

const MIN_DAYS = 10;
const MAX_DAYS = 30;

const MIN_YEARS = 1915;
const MAX_YEARS = 1990;

const MIN_GENRE_COUNT = 1;
const MAX_GENRE_COUNT = 3;

const filmsList = [
  {name: `The Dance of Life`, original: `The Dance of Life`, image: `the-dance-of-life.jpg`},
  {name: `Sagebrush Trail`, original: `Sagebrush Trail`, image: `sagebrush-trail.jpg`},
  {name: `The Man with the Golden Arm`, original: `The Man with the Golden Arm`, image: `the-man-with-the-golden-arm.jpg`},
  {name: `Santa Claus Conquers the Martians`, original: `Santa Claus Conquers the Martians`, image: `santa-claus-conquers-the-martians.jpg`},
  {name: `Popeye the Sailor Meets Sindbad the Sailor`, original: `Popeye the Sailor Meets Sindbad the Sailor`, image: `popeye-meets-sinbad.png`},
  {name: `The Great Flamarion`, original: `The Great Flamarion`, image: `the-great-flamarion.jpg`},
  {name: `Made for Each Other`, original: `Made for Each Other`, image: `made-for-each-other.png`},
];

const directorsList = [
  `Anthony Mann`,
  `Tommy Wiseau`,
  `Stanley Kubrick`,
  `Steven Allan Spielberg`
];

const writersList = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`
];

const actorsList = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Tommy Wiseau`
];

const countriesList = [
  `USA`,
  `Spain`,
  `England`
];

const genresList = [
  `Drama`,
  `Film-Noir`,
  `Mystery`,
  `Cartoon`,
  `Comedy`,
  `Western`,
  `Musical`
];

const ageRatingList = [
  `3+`,
  `13+`,
  `18+`
];

const descriptionList = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const commentsList = [
  {
    name: `Tim Macoveev`,
    date: `2019/12/31 23:59`,
    text: `Interesting setting and a good cast`,
    emoji: `smile.png`
  },
  {
    name: `John Doe`,
    date: `2 days ago`,
    text: `Booooooooooring`,
    emoji: `sleeping.png`
  },
  {
    name: `John Doe`,
    date: `2 days ago`,
    text: `Very very old. Meh`,
    emoji: `puke.png`
  },
  {
    name: `John Doe`,
    date: `Today`,
    text: `Almost two hours? Seriously?`,
    emoji: `angry.png`
  },
  {
    name: `Tommy Wiseau`,
    date: `1 days ago`,
    text: `I did not hit her, it's not true! It's bullshit! I did not hit her! I did not! Oh hi, Mark.`,
    emoji: `smile.png`
  },
];

const months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const getMockArray = (count) => {
  const filmsArray = [];
  for (let i = 0; i < count; i++) {
    const randomFilm = filmsList[getRandomInt(0, filmsList.length - 1)];
    const randomRating = getRandomInt(MIN_RATING, MAX_RATING) + `.` + getRandomInt(MIN_RATING, MAX_RATING);
    const randomDate = `` + getRandomInt(MIN_DAYS, MAX_DAYS) + ` ` + months[getRandomInt(0, months.length - 1)] + ` ` + getRandomInt(MIN_YEARS, MAX_YEARS);
    const randomRuntime = `1h ` + getRandomInt(MIN_MINUTS, MAX_MINUTS) + `m`;
    const id = `f` + (i + 1);
    const descriptionArray = shuffle(descriptionList, getRandomInt(MIN_DESC_COUNT, MAX_DESC_COUNT));
    let description = ``;
    descriptionArray.forEach((value) => {
      description += value + ` `;
    });

    const filmObj = {
      id,
      filmTitle: randomFilm.name,
      filmTitleOriginal: randomFilm.original,
      posterImage: `./images/posters/` + randomFilm.image,
      rating: randomRating,
      director: directorsList[getRandomInt(0, directorsList.length - 1)],
      writers: shuffle(writersList, getRandomInt(MIN_WRITERS, MAX_WRITERS)),
      actors: shuffle(actorsList, getRandomInt(MIN_ACTORS, MAX_ACTORS)),
      country: countriesList[getRandomInt(0, countriesList.length - 1)],
      genres: shuffle(genresList, getRandomInt(MIN_GENRE_COUNT, MAX_GENRE_COUNT)),
      releaseDate: randomDate,
      runtime: randomRuntime,
      comments: shuffle(commentsList, getRandomInt(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT)),
      description,
      ageRating: ageRatingList[getRandomInt(0, ageRatingList.length - 1)],
    };

    filmsArray.push(filmObj);
  }
  return filmsArray;
};

export {getMockArray};
