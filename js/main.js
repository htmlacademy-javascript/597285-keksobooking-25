import {
  getData,
} from './api.js';

import {
  disableActiveState,
} from './form.js';

import {
  renderMap,
  renderSimilarAdvertisements,
} from './map.js';

let gettedAdvertisements;

disableActiveState();
renderMap();

getData((advertisements) => {
  gettedAdvertisements = advertisements;
  renderSimilarAdvertisements(advertisements);
});

export {
  gettedAdvertisements,
};
