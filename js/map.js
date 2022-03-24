import {
  MainMarkerSize,
  MapStartLocation,
  MAP_START_ZOOM,
  MarkersIcomUrls,
  MarkerSize,
} from './data.js';
import {
  createFormValidator,
  enableActiveState,
  fillAddressInput,
} from './form.js';
import {
  createAdvertisementCard,
} from './similar-ads.js';

const map = L.map('map-canvas');

const renderMap = () => {
  map.on('load', () => {
    enableActiveState();
    createFormValidator();
  }).setView({
    lat: MapStartLocation.LAT,
    lng: MapStartLocation.LNG,
  }, MAP_START_ZOOM);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const createMainMarker = () => {
    const mainIcon = L.icon({
      iconUrl: MarkersIcomUrls.MAIN_MARKER,
      iconSize: [MainMarkerSize.WIDTH, MainMarkerSize.HEIGHT],
      iconAnchor: [MainMarkerSize.WIDTH / 2, MainMarkerSize.HEIGHT],
    });

    const lat = MapStartLocation.LAT;
    const lng = MapStartLocation.LNG;

    const mainMarker = L.marker({
      lat,
      lng,
    }, {
      icon: mainIcon,
      draggable: true,
    });
    mainMarker.addTo(map);
    mainMarker.on('moveend', (evt) => {
      fillAddressInput(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
    });
  };

  createMainMarker();
};

const renderSimilarAdvertisements = (advertisements) => {
  const icon = L.icon({
    iconUrl: MarkersIcomUrls.STANDART_MARKER,
    iconSize: [MarkerSize.WIDTH, MarkerSize.HEIGHT],
    iconAnchor: [MarkerSize.WIDTH / 2, MarkerSize.HEIGHT],
  });

  const markerGroup = L.layerGroup().addTo(map);

  const createMarker = (advertisement) => {
    const lat = advertisement.location.lat;
    const lng = advertisement.location.lng;

    const marker = L.marker({
      lat,
      lng,
    }, {
      icon: icon,
    });

    marker.addTo(markerGroup).bindPopup(createAdvertisementCard(advertisement));
  };

  advertisements.forEach((advertisement) => {
    createMarker(advertisement);
  });
};

export {
  renderMap,
  renderSimilarAdvertisements,
};
