const NUMBER_OF_ADVERTISEMENTS = 10;
const TITLES = [
  'Заголовок объявления 1',
  'Заголовок объявления 2',
  'Заголовок объявления 3',
  'Заголовок объявления 4',
  'Заголовок объявления 5',
  'Заголовок объявления 6',
  'Заголовок объявления 7',
  'Заголовок объявления 8',
  'Заголовок объявления 9',
  'Заголовок объявления 10'
];
const LOCATION_RANGES = {
  latMin: 35.65000,
  latMax: 35.70000,
  lngMin: 139.70000,
  lngMax: 139.80000,
};
const HOUSING_TYPES = [{
  type: 'palace',
  minPrice: 10000,
}, {
  type: 'flat',
  minPrice: 1000,
}, {
  type: 'house',
  minPrice: 5000,
}, {
  type: 'bungalow',
  minPrice: 0,
}, {
  type: 'hotel',
  minPrice: 3000,
}];
const MAX_PRICE = 100000;
const CHECKIN_CHECKOUT_VALUES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = [
  'Строка описания помещения 1',
  'Строка описания помещения 2',
  'Строка описания помещения 3',
  'Строка описания помещения 4',
  'Строка описания помещения 5',
  'Строка описания помещения 6',
  'Строка описания помещения 7',
  'Строка описания помещения 8',
  'Строка описания помещения 9',
  'Строка описания помещения 10',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

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

const createAdvertisements = () => {
  const getSet = () => {
    const arr = new Array(NUMBER_OF_ADVERTISEMENTS).fill(undefined).map((el, i) => i);
    return arr.sort(() => Math.random() - 0.5);
  };

  const set = getSet();
  const type = HOUSING_TYPES[getRandomNumber(0, HOUSING_TYPES.length - 1)].type;

  const getAvatar = () => `img/avatars/user${set[0] < 10 ? `0${set[0]}` : set[0]}.png`;
  const getTitle = () => TITLES[set[0]];

  const getPrice = () => {
    const minPrice = HOUSING_TYPES.find((el) => el.type === type).minPrice;
    return getRandomNumber(minPrice, MAX_PRICE);
  };

  const latitude = getRandomNumber(LOCATION_RANGES.latMin, LOCATION_RANGES.latMax, false, 5);
  const longitude = getRandomNumber(LOCATION_RANGES.lngMin, LOCATION_RANGES.lngMax, false, 5);

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

  const getPhotos = () => getRandomUniqueArray(PHOTOS);

  const createAdvertisement = () => ({
    author: {
      avatar: getAvatar(),
    },
    offer: {
      title: getTitle(),
      address: `${latitude}, ${longitude}`,
      price: getPrice(),
      type: type,
      rooms: getRandomNumber(1, 100),
      guests: getRandomNumber(1, 3),
      checkin: CHECKIN_CHECKOUT_VALUES[getRandomNumber(0, CHECKIN_CHECKOUT_VALUES.length - 1)],
      checkout: CHECKIN_CHECKOUT_VALUES[getRandomNumber(0, CHECKIN_CHECKOUT_VALUES.length - 1)],
      features: getRandomUniqueArray(FEATURES),
      description: DESCRIPTIONS[set[0]],
      photos: getPhotos(),
    },
    location: {
      lat: latitude,
      lng: longitude,
    },
  });

  const similarAdvertisements = Array(NUMBER_OF_ADVERTISEMENTS).fill(undefined).map(() => {
    const element = createAdvertisement();
    set.shift();
    return element;
  });

  return similarAdvertisements;
};

createAdvertisements();
