import WRISerializer from 'wri-json-api-serializer';

import DATASETS from 'data/datasets.json';
import { Dataset } from 'types';

export function fetchDatasets(): Promise<Dataset[]> {
  return Promise.resolve(WRISerializer(DATASETS));
}
export default {
  fetchDatasets,
};
