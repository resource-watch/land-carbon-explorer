import { FC, useCallback, useMemo } from 'react';

import { useDispatch } from 'react-redux';

import classnames from 'classnames';

// components

import { setActiveDatasets } from 'store/features/datasets';
import { useAppSelector } from 'store/hooks';

import { AppDispatch } from 'store';
import { Dataset, Layer, DatasetMetadata } from 'types';

import MapThumbnail from './map-thumbnail';
import { getDateConsideringTimeZone } from './utils';

export interface DatasetCardItemProps {
  dataset: Dataset;
  layer: Layer;
  metadata: DatasetMetadata[];
}

export const DatasetCardItem: FC<DatasetCardItemProps> = ({
  dataset,
  layer,
  metadata,
}: DatasetCardItemProps) => {
  const dispatch: AppDispatch = useDispatch();
  const activeDatasets = useAppSelector((state) => state.activeDatasets);
  const dateLastUpdated = getDateConsideringTimeZone(dataset.dataLastUpdated, true);
  const isDatasetActive = useMemo(
    () => Boolean(activeDatasets.find((datasetId) => datasetId === dataset.id)),
    [activeDatasets, dataset]
  );

  const handleClick = useCallback(() => {
    if (isDatasetActive)
      dispatch(setActiveDatasets(activeDatasets.filter((datasetId) => datasetId !== dataset.id)));
    else dispatch(setActiveDatasets([...activeDatasets, dataset.id]));
  }, [dataset, activeDatasets, isDatasetActive]);

  return (
    <div
      className={classnames({
        'flex flex-row relative rounded transition-all duration-200 shadow-rw-2 hover:shadow-rw-3 bg-white border transform hover:-translate-y-1.5':
          true,
        'focus:shadow-rw': isDatasetActive,
        'border-gray-100': !isDatasetActive,
      })}
      style={{
        minHeight: 130,
      }}
    >
      <div className="flex w-9/12 relative">
        <MapThumbnail layerSpec={layer} />
      </div>

      {/* INFO */}
      <div className="flex flex-col justify-between p-2">
        <div className="flex justify-between">
          {/* Source */}
          <div className="text-xs font-bold text-rw-gray-2" title={metadata?.[0]?.source}>
            {metadata?.[0]?.source}
          </div>
          {/* Last update */}
          <div className="text-xs font-bold text-rw-gray-2">{dateLastUpdated}</div>
        </div>

        {/* Title */}
        <div className="mt-2">
          <h4 className="text-rw-gray font-bold antialiased">
            {metadata?.[0]?.info?.name || dataset.name}
          </h4>
          <button
            type="button"
            className={classnames({
              'w-full mt-6 px-8 py-1 rounded bg-transparent text-sm antialiased border-rw-pink border focus:outline-none':
                true,
              'bg-rw-pink text-white': isDatasetActive,
              'text-rw-pink': !isDatasetActive,
            })}
            onClick={handleClick}
          >
            {isDatasetActive ? 'Active' : 'Add to map'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatasetCardItem;
