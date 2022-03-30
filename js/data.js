const NUMBER_OF_ADVERTISEMENTS = 10;
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
const LOCATION_ACCURACY = 5;
const FormTitleLengthRange = {
  MIN: 30,
  MAX: 100,
};

const CapacityMap = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const MapStartLocation = {
  LAT: 35.68250,
  LNG: 139.75300,
};

const MAP_START_ZOOM = 13;

const MarkerSize = {
  WIDTH: 40,
  HEIGHT: 40,
};

const MainMarkerSize = {
  WIDTH: 52,
  HEIGHT: 52,
};

const MarkersIcomUrls = {
  MAIN_MARKER: '../img/main-pin.svg',
  STANDART_MARKER: '../img/pin.svg',
};

export {
  HousingType,
  MAX_PRICE,
  FormTitleLengthRange,
  CapacityMap,
  MapStartLocation,
  MAP_START_ZOOM,
  LOCATION_ACCURACY,
  MarkerSize,
  MainMarkerSize,
  MarkersIcomUrls,
  NUMBER_OF_ADVERTISEMENTS,
};
