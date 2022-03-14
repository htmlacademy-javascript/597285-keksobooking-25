import {
  getAdvertisements
} from './data.js';

import {
  createSimilarAds
} from './similar-ads.js';

const advertisements = getAdvertisements();

createSimilarAds(advertisements);
