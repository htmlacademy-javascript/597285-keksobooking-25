import {
  IMAGE_TYPES,
} from './data.js';
import {
  fileUploadHandler,
} from './util.js';

const photoChooserElement = document.querySelector('.ad-form__upload input[type=file]');
const photoPreviewContainerElement = document.querySelector('.ad-form__photo');

const initPhotoLoader = () => {
  photoChooserElement.addEventListener('change', () => {
    photoPreviewContainerElement.innerHTML = '';

    const photoPreviewElement = document.createElement('img');
    photoPreviewElement.style.height = '100%';
    photoPreviewElement.style.width = 'auto';
    photoPreviewContainerElement.append(photoPreviewElement);

    fileUploadHandler(photoChooserElement, photoPreviewElement, IMAGE_TYPES);
  });
};

export {
  initPhotoLoader,
  photoPreviewContainerElement,
};
