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

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

const fileUploadHandler = (fileChooserElement, previewElement, allowedFileTypes) => {
  const file = fileChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = allowedFileTypes.some((it) => fileName.endsWith(it));

  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }
};

export {
  showSuccess,
  showError,
  debounce,
  fileUploadHandler,
};
