import { FC } from 'react';

// components
import DatasetListItem from '../card-item';

// styles
// import './styles.scss';

import { Dataset } from 'types';

export interface DatasetCardList {
  list: Dataset[];
  expandedChart?: boolean;
}

export const DatasetCardList: FC<DatasetCardList> = ({
  list,
  expandedChart,
}) => (
    <>
    {list.map((dataset) => (
      <div
        className="dataset-card-list-item-container mt-3 first:mt-0"
        key={dataset.id}
      >
        <DatasetListItem
          dataset={dataset}
          widget={dataset.widget ? dataset.widget.find((w) => w.default) : null}
          layer={dataset.layer ? dataset.layer.find((l) => l.default) : null}
          metadata={dataset.metadata && Array.isArray(dataset.metadata)
            ? dataset.metadata[0] : dataset.metadata}
          expandedChart={expandedChart}
        />
      </div>
    ))}
  </>
)

export default DatasetCardList;
