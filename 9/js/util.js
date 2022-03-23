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

const getRandomUniqueArray = (array) => {
  const newArrayLength = getRandomNumber(1, array.length);
  const copyArray = array.slice();

  return new Array(newArrayLength).fill(undefined).map(() => {
    const elementIndex = getRandomNumber(0, copyArray.length - 1);
    const element = copyArray[elementIndex];
    copyArray.splice(elementIndex, 1);
    return element;
  });
};

export {
  getRandomNumber,
  getRandomUniqueArray
};
