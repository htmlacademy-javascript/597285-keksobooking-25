import {
  getData,
} from './api.js';
import {
  NUMBER_OF_ADVERTISEMENTS,
} from './data.js';

import {
  disableActiveState,
} from './form.js';

import {
  renderMap,
  renderSimilarAdvertisements,
} from './map.js';

disableActiveState();
renderMap();

getData((advertisements) => {
  renderSimilarAdvertisements(advertisements.slice(0, NUMBER_OF_ADVERTISEMENTS));
});
