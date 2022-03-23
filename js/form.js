import {
  HousingType,
  MAX_PRICE,
  FormTitleLengthRange,
  CapacityMap,
  LOCATION_ACCURACY,
  MapStartLocation,
} from './data.js';

const form = document.querySelector('.ad-form');
const formFieldsetsList = form.querySelectorAll('fieldset');
const mapFiltersContainer = document.querySelector('.map__filters');
const mapFiltersContainerElements = Array.from(mapFiltersContainer.children);
const priceInput = form.querySelector('#price');
const addressInput = form.querySelector('#address');
const sliderElement = form.querySelector('.ad-form__slider');
const typeInput = form.querySelector('#type');

const fillAddressInput = (lat, lng) => {
  addressInput.value = `${lat.toFixed(LOCATION_ACCURACY)} ${lng.toFixed(LOCATION_ACCURACY)}`;
};

const createFormValidator = () => {
  const titleInput = form.querySelector('#title');
  const roomNumberInput = form.querySelector('#room_number');
  const capacityInput = form.querySelector('#capacity');

  titleInput.removeAttribute('minlength');
  titleInput.removeAttribute('maxlength');
  priceInput.removeAttribute('max');

  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
  });

  const validateTitle = (value) => value.length >= FormTitleLengthRange.MIN && value.length <= FormTitleLengthRange.MAX;

  const validatePrice = (value) => {
    const type = typeInput.value;
    const minPrice = HousingType[type.toUpperCase()].MIN_PRICE;

    return minPrice <= value && value <= MAX_PRICE;
  };

  const getPriceMessage = () => {
    const type = typeInput.value;
    const minPrice = HousingType[type.toUpperCase()].MIN_PRICE;

    return `Цена от ${minPrice} до ${MAX_PRICE}`;
  };

  const validateCapacity = (value) => {
    const roomNumber = roomNumberInput.value;
    return CapacityMap[roomNumber].includes(value);
  };

  const getCapacityMessage = () => {
    const roomNumber = roomNumberInput.value;
    return `Выберите "${CapacityMap[roomNumber].join('" или "')}"`;
  };

  const getTitleMessage = () => `Длина от ${FormTitleLengthRange.MIN} до ${FormTitleLengthRange.MAX} символов`;

  const typeChangeHandler = () => {
    pristine.validate(priceInput);
  };
  const roomsChangeHandler = () => {
    pristine.validate(capacityInput);
  };

  pristine.addValidator(titleInput, validateTitle, getTitleMessage);
  pristine.addValidator(priceInput, validatePrice, getPriceMessage);
  pristine.addValidator(capacityInput, validateCapacity, getCapacityMessage);

  typeInput.addEventListener('change', typeChangeHandler);
  roomNumberInput.addEventListener('change', roomsChangeHandler);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

const createNoUiSlider = () => {
  const type = typeInput.value;
  const minPrice = HousingType[type.toUpperCase()].MIN_PRICE;

  noUiSlider.create(sliderElement, {
    range: {
      min: minPrice,
      max: MAX_PRICE,
    },
    start: minPrice,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    priceInput.value = sliderElement.noUiSlider.get();
  });

  const typeChangeHandler = () => {
    const currentType = typeInput.value;
    const currentMinPrice = HousingType[currentType.toUpperCase()].MIN_PRICE;

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: currentMinPrice,
        max: MAX_PRICE,
      },
    });
  };

  const priceInputHandler = () => {
    const newPrice = priceInput.value;
    sliderElement.noUiSlider.set(newPrice);
  };

  typeInput.addEventListener('change', typeChangeHandler);
  priceInput.addEventListener('change', priceInputHandler);
};

const disableActiveState = () => {
  form.classList.add('ad-form--disabled');
  formFieldsetsList.forEach((item) => {
    item.setAttribute('disabled', '');
  });

  mapFiltersContainer.classList.add('map__filters--disabled');

  mapFiltersContainerElements.forEach((element) => {
    element.setAttribute('disabled', '');
  });
};

const enableActiveState = () => {
  form.classList.remove('ad-form--disabled');
  formFieldsetsList.forEach((item) => {
    item.removeAttribute('disabled', '');
  });

  mapFiltersContainer.classList.remove('map__filters--disabled');

  mapFiltersContainerElements.forEach((element) => {
    element.removeAttribute('disabled', '');
  });

  fillAddressInput(MapStartLocation.LAT, MapStartLocation.LNG);
  createNoUiSlider();
};

export {
  createFormValidator,
  enableActiveState,
  disableActiveState,
  fillAddressInput,
};
