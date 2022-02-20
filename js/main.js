const getRandomInteger = (min, max) => {
  if (min < 0) {
    min = 0;
  }

  if (max < 0) {
    max *= -1;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  if (min === max) {
    return min;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, depth = 1) => {
  if (min < 0) {
    min = 0;
  }

  if (max < 0) {
    max *= -1;
  }

  if (min === max) {
    return min;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return (Math.random() * (max - min) + min).toFixed(depth);
};

getRandomInteger();
getRandomFloat();
