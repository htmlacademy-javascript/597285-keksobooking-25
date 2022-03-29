const mapElement = document.querySelector('.map__canvas');
const messageElement = document.createElement('div');
messageElement.textContent = 'Произошла ошибка загрузки данных';
messageElement.style.cssText = 'position: absolute; z-index: 1000; padding: 20px; border: 2px solid #d41919; color: #d41919; font-weight: bold; background: rgba(0,0,0,0.7); font-size: 20px; top: 5%; left: 50%; transform: translate(-50%, 0);';

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
      console.log(response.status);
      if (response.ok) {
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
