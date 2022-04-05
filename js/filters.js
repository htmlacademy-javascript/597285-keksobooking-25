import {
  PriceCategories,
  RERENDER_DELAY,
} from './data.js';
import {
  gettedAdvertisements,
} from './main.js';
import {
  renderSimilarAdvertisements,
} from './map.js';
import {
  debounce,
} from './util.js';

const mapFiltersContainerElement = document.querySelector('.map__filters');
const mapFiltersContainerElements = Array.from(mapFiltersContainerElement.children);
const filterTypeElement = mapFiltersContainerElement.querySelector('#housing-type');
const filterPriceElement = mapFiltersContainerElement.querySelector('#housing-price');
const filterRoomsElement = mapFiltersContainerElement.querySelector('#housing-rooms');
const filterGuestsElement = mapFiltersContainerElement.querySelector('#housing-guests');
const filterFeaturesElement = mapFiltersContainerElement.querySelector('#housing-features');
const filterFeaturesElements = Array.from(filterFeaturesElement.querySelectorAll('input'));

const verificateType = (typeFilter, typeAdvertisement) => {
  if (typeFilter !== 'any') {
    return typeAdvertisement === typeFilter;
  }
  return true;
};

const verificatePrice = (priceFilter, priceAdvertisement) => {
  if (priceFilter !== 'any') {
    const priceMin = PriceCategories[priceFilter.toUpperCase()][0];
    const priceMax = PriceCategories[priceFilter.toUpperCase()][1];
    return priceAdvertisement >= priceMin && priceAdvertisement <= priceMax;
  }
  return true;
};

const verificateRooms = (roomNumberFilter, roomNumberAdvertisement) => {
  if (roomNumberFilter !== 'any') {
    return +roomNumberFilter === roomNumberAdvertisement;
  }
  return true;
};

const verificateGuests = (guestsNumberFilter, guestsNumberAdvertisement) => {
  if (guestsNumberFilter !== 'any') {
    return guestsNumberAdvertisement === +guestsNumberFilter;
  }
  return true;
};

const verificateFeatures = (featuresFilter, featuresAdvertisement) => {
  if (featuresFilter.length) {
    if (featuresAdvertisement) {
      // тут не получается forEach использовать - он не прерывается от return
      for (let i = 0; i < featuresFilter.length; i++) {
        const result = featuresAdvertisement.some((item) => item === featuresFilter[i]);
        if (!result) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  return true;
};

const verificationAdvertisement = (advertisement) => {
  const filterType = filterTypeElement.value;
  const filterPrice = filterPriceElement.value;
  const filterRoomsNumber = filterRoomsElement.value;
  const filterGuestsNumber = filterGuestsElement.value;
  const filterFeatures = filterFeaturesElements.filter((el) => el.checked).map((el) => el.value);

  return verificateType(filterType, advertisement.offer.type) &&
    verificatePrice(filterPrice, advertisement.offer.price) &&
    verificateRooms(filterRoomsNumber, advertisement.offer.rooms) &&
    verificateGuests(filterGuestsNumber, advertisement.offer.guests) &&
    verificateFeatures(filterFeatures, advertisement.offer.features);
};

const mapFiltersHandler = () => {
  renderSimilarAdvertisements(gettedAdvertisements);
};

const initMapFilters = () => {
  mapFiltersContainerElement.addEventListener('change', debounce(() => mapFiltersHandler(), RERENDER_DELAY));
};

export {
  mapFiltersContainerElement,
  mapFiltersContainerElements,
  verificationAdvertisement,
  filterTypeElement,
  initMapFilters,
};
