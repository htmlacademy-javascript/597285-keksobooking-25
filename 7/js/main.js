import {
  getAdvertisements
} from './data.js';

import {
  createSimilarAds
} from './similar-ads.js';

import {
  createFormValidator
} from './form.js';

createFormValidator();

const advertisements = getAdvertisements();

createSimilarAds(advertisements);
