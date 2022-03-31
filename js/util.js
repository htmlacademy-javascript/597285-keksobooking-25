const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const bodyElement = document.querySelector('body');

const isEscapeKey = (evt) => evt.key === 'Escape';
const isClickEvent = (evt) => evt.type === 'click';

const closeModal = (modalElement) => {
  modalElement.remove();
  document.removeEventListener('keydown', closeModalHandler);
  window.removeEventListener('click', closeModalHandler);
};

function closeModalHandler(evt) {
  const modalElement = document.querySelector('.success') || document.querySelector('.error');

  if (isEscapeKey(evt) || isClickEvent(evt)) {
    evt.preventDefault();
    closeModal(modalElement);
  }
}

const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);

  bodyElement.appendChild(successElement);
  document.addEventListener('keydown', closeModalHandler);
  window.addEventListener('click', closeModalHandler);
};

const showError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  const errorButtonElement = errorElement.querySelector('.error__button');

  bodyElement.appendChild(errorElement);
  document.addEventListener('keydown', closeModalHandler);
  window.addEventListener('click', closeModalHandler);
  errorButtonElement.addEventListener('click', closeModalHandler);
};

export {
  showSuccess,
  showError,
};
