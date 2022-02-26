const getRandomNumber = (min, max, isInteger = true, depth = 1) => {
  try {
    if (min < 0 || max < 0) {
      throw new RangeError('Диапазон должен быть положительный');
    }
  } catch (e) {
    if (e instanceof RangeError) {
      return e.message;
    }
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  if (isInteger) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (Math.random() * (max - min) + min).toFixed(depth);
};

getRandomNumber();
