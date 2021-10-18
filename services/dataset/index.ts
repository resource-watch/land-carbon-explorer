import WRISerializer from 'wri-json-api-serializer';

import DATASETS from 'data/datasets.json';
// import { WRIAPI } from 'lib/axios';
import { Dataset } from 'types';

// utils

// API docs: https://resource-watch.github.io/doc-api/index-rw.html#dataset

/**
 * Fetches datasets according to params.
 * Check out the API docs for this endpoint {@link https://resource-watch.github.io/doc-api/index-rw.html#getting-all-datasets|here}
 * @param {Object} params Request parameters.
 * @param {Object} headers Request headers.
 * @param {boolean} _meta Boolean flag indicating whether the meta object should
 * @returns {Array} Array of serialized datasets.
 * be included in the response or not.
 */
export function fetchDatasets(): Promise<Dataset[]> {
  // params = {},
  // headers = {},
  // _meta = false
  // todo: remove this line when datasets are in the API.
  return Promise.resolve(WRISerializer(DATASETS));
}
// const newParams = {
//   // env: process.env.NEXT_PUBLIC_API_ENV,
//   // application: process.env.NEXT_PUBLIC_APPLICATIONS,
//   ...params,
// };
// return WRIAPI.get('/v1/dataset', {
//   headers: {
//     ...WRIAPI.defaults.headers,
//     ...headers,
//   },
//   params: newParams,
//   transformResponse: [].concat(WRIAPI.defaults.transformResponse, ({ data, meta }) => ({
//     datasets: data,
//     meta,
//   })),
// })
//   .then((response) => {
//     const { status, statusText, data } = response;
//     const { datasets, meta } = data;

//     if (status >= 300) {
//       throw new Error(statusText);
//     }

//     if (_meta) {
//       return {
//         datasets: WRISerializer({ data: datasets }),
//         meta,
//       };
//     }

//     return WRISerializer({ data: datasets });
//   })
//   .catch((response) => {
//     const { status, statusText } = response;

//     throw new Error(`Error fetching datasets: ${status}: ${statusText}`);
//   });

export default {
  fetchDatasets,
};
