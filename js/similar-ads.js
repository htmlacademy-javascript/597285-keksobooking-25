const createAdvertisementCard = ({
  author,
  offer,
}) => {
  const similarAdsTemplate = document.querySelector('#card').content.querySelector('.popup');
  const advertisementElement = similarAdsTemplate.cloneNode(true);

  const getType = (type) => {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalow':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец';
      case 'hotel':
        return 'Отель';
      default:
        return 'Неизвестно';
    }
  };

  advertisementElement.querySelector('.popup__title').textContent = offer.title;
  advertisementElement.querySelector('.popup__text--address').textContent = offer.address;
  advertisementElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  advertisementElement.querySelector('.popup__type').textContent = getType(offer.type);
  advertisementElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresContainerElement = advertisementElement.querySelector('.popup__features');

  if (offer.features) {
    const featuresList = featuresContainerElement.querySelectorAll('.popup__feature');
    featuresList.forEach((item) => {
      const isNecessary = offer.features.some(
        (feature) => item.classList.contains(`popup__feature--${feature}`),
      );

      if (!isNecessary) {
        item.remove();
      }
    });
  } else {
    featuresContainerElement.style.display = 'none';
  }

  const descriptionContainerElement = advertisementElement.querySelector('.popup__description');
  if (offer.description) {
    descriptionContainerElement.textContent = offer.description;
  } else {
    descriptionContainerElement.style.display = 'none';
  }

  const photoItemsContainerElement = advertisementElement.querySelector('.popup__photos');

  if (offer.photos) {
    const photoItemTemplateElement = advertisementElement.querySelector('.popup__photo');
    const photoItemsFragment = document.createDocumentFragment();
    offer.photos.forEach((photo) => {
      const photoItem = photoItemTemplateElement.cloneNode(true);
      photoItem.src = photo;
      photoItemsFragment.appendChild(photoItem);
    });
    photoItemsContainerElement.appendChild(photoItemsFragment);
    photoItemTemplateElement.remove();
  } else {
    photoItemsContainerElement.style.display = 'none';
  }

  advertisementElement.querySelector('.popup__avatar').src = author.avatar;

  return advertisementElement;
};

export {
  createAdvertisementCard,
};
