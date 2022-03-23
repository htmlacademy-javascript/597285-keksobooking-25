import {
  getAdvertisements,
} from './data.js';

import {
  disableActiveState,
} from './form.js';

import {
  renderMap,
  renderSimilarAdvertisements,
} from './map.js';

disableActiveState();

const advertisements = getAdvertisements();

renderMap();
renderSimilarAdvertisements(advertisements);
