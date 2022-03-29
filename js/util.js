// const getRandomNumber = (min, max, isInteger = true, depth = 1) => {
//   try {
//     if (min < 0 || max < 0) {
//       throw new RangeError('Диапазон должен быть положительный');
//     }
//   } catch (e) {
//     if (e instanceof RangeError) {
//       return e.message;
//     }
//   }

//   if (min > max) {
//     [min, max] = [max, min];
//   }

//   if (isInteger) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   }

//   return (Math.random() * (max - min) + min).toFixed(depth);
// };

// const getRandomUniqueArray = (array) => {
//   const newArrayLength = getRandomNumber(1, array.length);
//   const copyArray = array.slice();

//   return new Array(newArrayLength).fill(undefined).map(() => {
//     const elementIndex = getRandomNumber(0, copyArray.length - 1);
//     const element = copyArray[elementIndex];
//     copyArray.splice(elementIndex, 1);
//     return element;
//   });
// };
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);
const bodyElement = document.querySelector('body');
const errorButtonElement = errorElement.querySelector('.error__button');

const isEscapeKey = (evt) => evt.key === 'Escape';
const isClickEvent = (evt) => evt.type === 'click';

const closeModal = (modalElement) => {
  modalElement.remove();
  document.removeEventListener('keydown', closeModalHandler);
  window.removeEventListener('click', closeModalHandler);
  if (modalElement.contains(errorButtonElement)) {
    errorButtonElement.removeEventListener('click', closeModalHandler);
  }
};

function closeModalHandler(modalElement) {
  return (evt) => {
    if (isEscapeKey(evt) || isClickEvent(evt)) {
      evt.preventDefault();
      closeModal(modalElement);
    }
  };
}

const showSuccess = () => {
  bodyElement.appendChild(successElement);
  document.addEventListener('keydown', closeModalHandler(successElement));
  window.addEventListener('click', closeModalHandler(successElement));
};

const showError = () => {
  bodyElement.appendChild(errorElement);
  document.addEventListener('keydown', closeModalHandler(errorElement));
  window.addEventListener('click', closeModalHandler(errorElement));
  errorButtonElement.addEventListener('click', closeModalHandler(errorElement));
};

export {
  // getRandomNumber,
  // getRandomUniqueArray,
  showSuccess,
  showError,
};
