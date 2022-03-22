const createSimilarAds = (advertisements) => {
  const similarAdsTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarAdsContainer = document.querySelector('#map-canvas');
  const similarAdsFragment = document.createDocumentFragment();

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

  const createAdvertisementCard = (author, offer) => {
    const advertisementElement = similarAdsTemplate.cloneNode(true);

    advertisementElement.querySelector('.popup__title').textContent = offer.title;
    advertisementElement.querySelector('.popup__text--address').textContent = offer.address;
    advertisementElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    advertisementElement.querySelector('.popup__type').textContent = getType(offer.type);
    advertisementElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

    const featuresContainer = advertisementElement.querySelector('.popup__features');

    if (offer.features) {
      const featuresList = featuresContainer.querySelectorAll('.popup__feature');
      featuresList.forEach((item) => {
        const isNecessary = offer.features.some(
          (feature) => item.classList.contains(`popup__feature--${feature}`),
        );

        if (!isNecessary) {
          item.remove();
        }
      });
    } else {
      featuresContainer.style.display = 'none';
    }

    const descriptionContainer = advertisementElement.querySelector('.popup__description');
    if (offer.description) {
      descriptionContainer.textContent = offer.description;
    } else {
      descriptionContainer.style.display = 'none';
    }

    const photoItemsContainer = advertisementElement.querySelector('.popup__photos');

    if (offer.photos) {
      const photoItemTemplate = advertisementElement.querySelector('.popup__photo');
      const photoItemsFragment = document.createDocumentFragment();
      offer.photos.forEach((photo) => {
        const photoItem = photoItemTemplate.cloneNode(true);
        photoItem.src = photo;
        photoItemsFragment.appendChild(photoItem);
      });
      photoItemsContainer.appendChild(photoItemsFragment);
      photoItemTemplate.remove();
    } else {
      photoItemsContainer.style.display = 'none';
    }

    advertisementElement.querySelector('.popup__avatar').src = author.avatar;

    similarAdsFragment.appendChild(advertisementElement);
  };

  advertisements.forEach(({
    author,
    offer,
  }) => {
    createAdvertisementCard(author, offer);
  });

  similarAdsContainer.appendChild(similarAdsFragment);
};

export {
  createSimilarAds
};
