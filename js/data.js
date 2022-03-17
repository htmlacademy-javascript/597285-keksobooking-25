import {
  getRandomNumber,
  getRandomUniqueArray
} from './util.js';

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
const LocationRange = {
  LAT: {
    MIN: 35.65000,
    MAX: 35.70000,
  },

  LNG: {
    MIN: 139.70000,
    MAX: 139.80000,
  },
};
const HousingType = {
  PALACE: {
    TYPE: 'palace',
    MIN_PRICE: 10000,
  },
  FLAT: {
    TYPE: 'flat',
    MIN_PRICE: 1000,
  },
  HOUSE: {
    TYPE: 'house',
    MIN_PRICE: 5000,
  },
  BUNGALOW: {
    TYPE: 'bungalow',
    MIN_PRICE: 0,
  },
  HOTEL: {
    TYPE: 'hotel',
    MIN_PRICE: 3000,
  },
};
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
const RoomsRange = {
  MIN: 1,
  MAX: 100,
};
const GuestsRange = {
  MIN: 1,
  MAX: 3,
};
const LOCATION_ACCURACY = 5;

const getAdvertisements = () => {
  const getSet = () => {
    const arr = new Array(NUMBER_OF_ADVERTISEMENTS).fill(undefined).map((el, i) => i);
    return arr.sort(() => Math.random() - 0.5);
  };

  const set = getSet();

  const createAdvertisement = () => {
    const latitude = getRandomNumber(LocationRange.LAT.MIN, LocationRange.LAT.MAX, false, LOCATION_ACCURACY);
    const longitude = getRandomNumber(LocationRange.LNG.MIN, LocationRange.LNG.MAX, false, LOCATION_ACCURACY);
    const type = Object.keys(HousingType)[getRandomNumber(0, Object.keys(HousingType).length - 1)];

    const getPhotos = () => getRandomUniqueArray(PHOTOS);
    const getAvatar = () => `img/avatars/user${set[0]+1 < 10 ? `0${set[0]+1}` : set[0]+1}.png`;
    const getTitle = () => TITLES[set[0]];
    const getPrice = () => {
      const minPrice = HousingType[type].MIN_PRICE;
      return getRandomNumber(minPrice, MAX_PRICE);
    };

    return {
      author: {
        avatar: getAvatar(),
      },
      offer: {
        title: getTitle(),
        address: `${latitude}, ${longitude}`,
        price: getPrice(),
        type: HousingType[type].TYPE,
        rooms: getRandomNumber(RoomsRange.MIN, RoomsRange.MAX),
        guests: getRandomNumber(GuestsRange.MIN, GuestsRange.MAX),
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
    };
  };

  const similarAdvertisements = Array(NUMBER_OF_ADVERTISEMENTS).fill(undefined).map(() => {
    const element = createAdvertisement();
    set.shift();
    return element;
  });

  return similarAdvertisements;
};

export {getAdvertisements, HousingType, MAX_PRICE};
