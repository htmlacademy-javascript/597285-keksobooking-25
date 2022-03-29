import {
  sendData
} from './api.js';
import {
  HousingType,
  MAX_PRICE,
  FormTitleLengthRange,
  CapacityMap,
  LOCATION_ACCURACY,
  MapStartLocation,
} from './data.js';
import {
  resetMap
} from './map.js';
import {
  showError,
  showSuccess
} from './util.js';

const formElement = document.querySelector('.ad-form');
const formFieldsetElements = formElement.querySelectorAll('fieldset');
const mapFiltersContainerElement = document.querySelector('.map__filters');
const mapFiltersContainerElements = Array.from(mapFiltersContainerElement.children);
const priceInputElement = formElement.querySelector('#price');
const addressInputElement = formElement.querySelector('#address');
const sliderElement = formElement.querySelector('.ad-form__slider');
const typeInputElement = formElement.querySelector('#type');
const submitButtonElement = formElement.querySelector('.ad-form__submit');
const resetButtonElement = formElement.querySelector('.ad-form__reset');

const fillAddressInput = (lat, lng) => {
  addressInputElement.value = `${lat.toFixed(LOCATION_ACCURACY)} ${lng.toFixed(LOCATION_ACCURACY)}`;
};

const createNoUiSlider = () => {
  const type = typeInputElement.value;
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
      to: (value) => {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    priceInputElement.value = sliderElement.noUiSlider.get();
  });

  const typeChangeHandler = () => {
    const currentType = typeInputElement.value;
    const currentMinPrice = HousingType[currentType.toUpperCase()].MIN_PRICE;

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: currentMinPrice,
        max: MAX_PRICE,
      },
    });
  };

  const priceInputHandler = () => {
    const newPrice = priceInputElement.value;
    sliderElement.noUiSlider.set(newPrice);
  };

  typeInputElement.addEventListener('change', typeChangeHandler);
  priceInputElement.addEventListener('change', priceInputHandler);
};

const resetUiSlider = () => {
  const type = typeInputElement.value;
  const price = HousingType[type.toUpperCase()].MIN_PRICE;
  priceInputElement.value = price;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: price,
      max: MAX_PRICE,
    },
  });
  sliderElement.noUiSlider.set(price);
};

const createFormValidator = () => {
  const titleInputElement = formElement.querySelector('#title');
  const roomNumberInputElement = formElement.querySelector('#room_number');
  const capacityInputElement = formElement.querySelector('#capacity');

  titleInputElement.removeAttribute('minlength');
  titleInputElement.removeAttribute('maxlength');
  priceInputElement.removeAttribute('max');

  const pristine = new Pristine(formElement, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
  });

  const validateTitle = (value) => value.length >= FormTitleLengthRange.MIN && value.length <= FormTitleLengthRange.MAX;

  const validatePrice = (value) => {
    const type = typeInputElement.value;
    const minPrice = HousingType[type.toUpperCase()].MIN_PRICE;

    return minPrice <= value && value <= MAX_PRICE;
  };

  const getPriceMessage = () => {
    const type = typeInputElement.value;
    const minPrice = HousingType[type.toUpperCase()].MIN_PRICE;

    return `Цена от ${minPrice} до ${MAX_PRICE}`;
  };

  const validateCapacity = (value) => {
    const roomNumber = +roomNumberInputElement.value;
    return CapacityMap[roomNumber].includes(+value);
  };

  const getCapacityMessage = () => {
    const roomNumber = roomNumberInputElement.value;
    const allowedValuesTexts = CapacityMap[roomNumber].map((el) => capacityInputElement.querySelector(`option[value="${el}"]`).textContent);
    return `Выберите "${allowedValuesTexts.join('" или "')}"`;
  };

  const getTitleMessage = () => `Длина от ${FormTitleLengthRange.MIN} до ${FormTitleLengthRange.MAX} символов`;

  const typeChangeHandler = () => pristine.validate(priceInputElement);
  const roomsChangeHandler = () => pristine.validate(capacityInputElement);

  pristine.addValidator(titleInputElement, validateTitle, getTitleMessage);
  pristine.addValidator(priceInputElement, validatePrice, getPriceMessage);
  pristine.addValidator(capacityInputElement, validateCapacity, getCapacityMessage);

  typeInputElement.addEventListener('change', typeChangeHandler);
  roomNumberInputElement.addEventListener('change', roomsChangeHandler);

  const timeinElement = formElement.querySelector('#timein');
  const timeoutElement = formElement.querySelector('#timeout');
  const timeinElementHandler = () => {
    timeoutElement.value = timeinElement.value;
  };
  const timeoutElementHandler = () => {
    timeinElement.value = timeoutElement.value;
  };
  timeinElement.addEventListener('change', timeinElementHandler);
  timeoutElement.addEventListener('change', timeoutElementHandler);

  const blockSubmitButton = () => {
    submitButtonElement.disabled = true;
    submitButtonElement.textContent = 'Сохраняю...';
  };
  const unblockSubmitButton = () => {
    submitButtonElement.disabled = false;
    submitButtonElement.textContent = 'Опубликовать';
  };

  const resetForm = (evt) => {
    evt.preventDefault();
    formElement.reset();
    pristine.reset();
    resetUiSlider();
    resetMap();
    mapFiltersContainerElement.reset();
  };

  resetButtonElement.addEventListener('click', resetForm);

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          showSuccess();
          resetForm();
        },
        () => {
          unblockSubmitButton();
          showError();
        },
        new FormData(evt.target)
      );
    }
  });
};

const disableActiveState = () => {
  formElement.classList.add('ad-form--disabled');
  formFieldsetElements.forEach((item) => item.setAttribute('disabled', ''));

  mapFiltersContainerElement.classList.add('map__filters--disabled');

  mapFiltersContainerElements.forEach((element) => element.setAttribute('disabled', ''));
};

const enableActiveState = () => {
  formElement.classList.remove('ad-form--disabled');
  formFieldsetElements.forEach((item) => item.removeAttribute('disabled', ''));

  mapFiltersContainerElement.classList.remove('map__filters--disabled');

  mapFiltersContainerElements.forEach((element) => element.removeAttribute('disabled', ''));

  fillAddressInput(MapStartLocation.LAT, MapStartLocation.LNG);
  createNoUiSlider();
};

export {
  createFormValidator,
  enableActiveState,
  disableActiveState,
  fillAddressInput,
};
