import {
  MainMarkerSize,
  MapStartLocation,
  MAP_START_ZOOM,
  MarkersIcomUrls,
  MarkerSize,
  NUMBER_OF_ADVERTISEMENTS,
} from './data.js';
import {
  createFormValidator,
  enableActiveState,
  enableMapFilters,
  fillAddressInput,
} from './form.js';
import {
  createAdvertisementCard,
} from './similar-ads.js';
import {
  verifyAdvertisement,
} from './filters.js';
import { gettedAdvertisements } from './main.js';

const map = L.map('map-canvas');

const mainIcon = L.icon({
  iconUrl: MarkersIcomUrls.MAIN_MARKER,
  iconSize: [MainMarkerSize.WIDTH, MainMarkerSize.HEIGHT],
  iconAnchor: [MainMarkerSize.WIDTH / 2, MainMarkerSize.HEIGHT],
});

const mainMarker = L.marker({
  lat: MapStartLocation.LAT,
  lng: MapStartLocation.LNG,
}, {
  icon: mainIcon,
  draggable: true,
});

const icon = L.icon({
  iconUrl: MarkersIcomUrls.STANDART_MARKER,
  iconSize: [MarkerSize.WIDTH, MarkerSize.HEIGHT],
  iconAnchor: [MarkerSize.WIDTH / 2, MarkerSize.HEIGHT],
});

const markerGroup = L.layerGroup();

const createMainMarker = () => {
  mainMarker.addTo(map);
  mainMarker.on('moveend', (evt) => {
    fillAddressInput(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
  });
};

const renderMap = () => {
  map.setView({
    lat: MapStartLocation.LAT,
    lng: MapStartLocation.LNG,
  }, MAP_START_ZOOM);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  createMainMarker();

  enableActiveState();
  createFormValidator();
};

const renderSimilarAdvertisements = (advertisements) => {
  markerGroup.clearLayers();
  markerGroup.addTo(map);

  const createMarker = (advertisement) => {
    const marker = L.marker({
      lat: advertisement.location.lat,
      lng: advertisement.location.lng,
    }, {
      icon: icon,
    });

    marker.addTo(markerGroup).bindPopup(createAdvertisementCard(advertisement));
  };

  const filteredAdvertisements = advertisements.slice().filter(verifyAdvertisement).slice(0, NUMBER_OF_ADVERTISEMENTS);

  filteredAdvertisements.forEach((advertisement) => {
    createMarker(advertisement);
  });

  enableMapFilters();
};

const resetMap = () => {
  map.closePopup();
  mainMarker.setLatLng([MapStartLocation.LAT, MapStartLocation.LNG]);
  fillAddressInput(MapStartLocation.LAT, MapStartLocation.LNG);
  renderSimilarAdvertisements(gettedAdvertisements);
};

export {
  renderMap,
  renderSimilarAdvertisements,
  resetMap,
};
