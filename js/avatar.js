import {
  IMAGE_TYPES,
} from './data.js';
import {
  fileUploadHandler,
} from './util.js';

const avatarChooserElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');

const initAvatarLoader = () => {
  avatarChooserElement.addEventListener('change', () => {
    fileUploadHandler(avatarChooserElement, avatarPreviewElement, IMAGE_TYPES);
  });
};

export {
  initAvatarLoader,
  avatarPreviewElement,
};
