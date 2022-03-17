import {
  HousingType,
  MAX_PRICE,
} from './data.js';

const createFormValidator = () => {
  const form = document.querySelector('.ad-form');

  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    // errorTextClass: 'ad-form__error-text',
    errorTextTag: 'span',
  });

  const validateTitle = (value) => value.length >= 30 && value.length <= 100;

  const validatePrice = (value) => {
    const type = form.querySelector('#type').value;

    // обернуть в try catch
    const minPrice = HousingType[type.toUpperCase()].MIN_PRICE;

    return minPrice <= value && value <= MAX_PRICE;
  };

  const getPriceMessage = () => {
    const type = form.querySelector('#type').value;

    // обернуть в try catch
    const minPrice = HousingType[type.toUpperCase()].MIN_PRICE;

    return `Цена от ${minPrice} до ${MAX_PRICE}`;
  };

  const validateCapacity = (value) => {
    const roomNumber = form.querySelector('#room_number').value;
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
    const roomNumber = form.querySelector('#room_number').value;
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

  pristine.addValidator(form.querySelector('#title'), validateTitle, 'Длина от 30 до 100 символов');
  pristine.addValidator(form.querySelector('#price'), validatePrice, getPriceMessage);
  pristine.addValidator(form.querySelector('#capacity'), validateCapacity, getCapacityMessage);

  const typeChangeHandler = () => {
    pristine.validate(form.querySelector('#price'));
  };
  const roomsChangeHandler = () => {
    pristine.validate(form.querySelector('#capacity'));
  };

  form.querySelector('#type').addEventListener('change', typeChangeHandler);
  form.querySelector('#room_number').addEventListener('change', roomsChangeHandler);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {
  createFormValidator
};
