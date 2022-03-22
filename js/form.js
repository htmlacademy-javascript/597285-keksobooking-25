import {
  HousingType,
  MAX_PRICE,
  FormTitleLengthRange,
} from './data.js';

const form = document.querySelector('.ad-form');
const formFieldsetsList = form.querySelectorAll('fieldset');
const mapFiltersContainer = document.querySelector('.map__filters');
const mapFiltersContainerElements = Array.from(mapFiltersContainer.children);

const createFormValidator = () => {
  const titleInput = form.querySelector('#title');
  const priceInput = form.querySelector('#price');
  const typeInput = form.querySelector('#type');
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
    switch (+roomNumber) {
      case 1:
        return +value === 1;
      case 2:
        return +value === 1 || +value === 2;
      case 3:
        return +value === 1 || +value === 2 || +value === 3;
      case 100:
        return +value === 0;
    }
  };

  const getCapacityMessage = () => {
    const roomNumber = roomNumberInput.value;
    switch (+roomNumber) {
      case 1:
        return 'Выберите «для 1 гостя»';
      case 2:
        return 'Выберите «для 2 гостей» или «для 1 гостя»';
      case 3:
        return 'Выберите «для 3 гостей», «для 2 гостей» или «для 1 гостя»';
      case 100:
        return 'Выберите «не для гостей»';
    }
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
};

export {
  createFormValidator,
  enableActiveState,
  disableActiveState,
};
