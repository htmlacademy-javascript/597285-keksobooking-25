import {
  LoadErrorPopup,
} from './data.js';

const mapElement = document.querySelector('.map__canvas');
const messageElement = document.createElement('div');
messageElement.textContent = LoadErrorPopup.MESSAGE;
messageElement.style.cssText = LoadErrorPopup.CSS;

const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((advertistments) => {
      onSuccess(advertistments);
    })
    .catch(() => {
      mapElement.appendChild(messageElement);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://25.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: body,
  })
    .then((response) => {
      if (response.status === 200) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData,
};
