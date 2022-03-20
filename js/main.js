import {
  getAdvertisements
} from './data.js';

import {
  createSimilarAds
} from './similar-ads.js';

import {
  createFormValidator,
  enableActiveState,
  disableActiveState,
} from './form.js';

disableActiveState();
enableActiveState();

createFormValidator();

const advertisements = getAdvertisements();

createSimilarAds(advertisements);
