export {shuffle, getRandomInt};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray, count) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  if (someArray.length < count) {
    count = someArray.length;
  }

  const newArray = [];
  for (let i = 0; i < count; i++) {
    newArray.push(someArray[i]);
  }

  return newArray;
};
