import {
  FC,
  useCallback,
} from 'react';
import classnames from 'classnames';

// components
import MapThumbnail from './map-thumbnail';

import { Dataset, Layer, DatasetMetadata } from 'types';

import { getDateConsideringTimeZone } from './utils';

export interface DatasetCardItem {
  dataset: Dataset;
  layer: Layer;
  metadata: DatasetMetadata;
  expandedChart: boolean;
}

export const DatasetCardItem: FC<DatasetCardItem> = ({
    dataset,
    layer,
    metadata,
    expandedChart,
  }) => {
  const dateLastUpdated = getDateConsideringTimeZone(dataset.dataLastUpdated, true);
  console.log('dataset', dataset);

  const renderChart = useCallback(() => {
    const classNameValue = classnames({
      'list-item-chart': true,
      '-expanded-chart': expandedChart,
    });

    return (
      <div className={classNameValue}>
        <MapThumbnail layerSpec={layer} />
      </div>
    );
  }, [dataset, layer, expandedChart]);


  return (
    <div
      className={classnames({
        'flex flex-row relative w-full rounded transition-shadow bg-white border border-gray-300': true,
        '-active': dataset.active,
      })}
      style={{
        minHeight: 130,
      }}
    >
      <div className="relative">
      {renderChart()}
      </div>

      {/* INFO */}
      <div className="p-2">
        <div className="flex justify-between">
          {/* Source */}
          <div
            className="text-xs font-bold text-rw-gray-2"
            title={metadata && metadata.source}
          >
            {metadata && metadata.source}
          </div>
          {/* Last update */}
          <div className="text-xs font-bold text-rw-gray-2">
            {dateLastUpdated}
          </div>
        </div>

        {/* Title */}
        <div className="title-actions">
          <h4 className="text-rw-gray font-bold">
            {(metadata && metadata.info && metadata.info.name) || dataset.name}
          </h4>
          {/* {actions && (
            <Media
              greaterThanOrEqual="md"
            >
              {cloneElement(
                actions,
                ({ ...props }),
              )}
            </Media>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default DatasetCardItem;
