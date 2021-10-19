import { FC } from 'react';

// components
import { Dataset } from 'types';

import DatasetListItem from '../card-item';

// styles
// import './styles.scss';

export interface DatasetCardListProps {
  list: Dataset[];
  expandedChart?: boolean;
}

<<<<<<< HEAD
export const DatasetCardList: FC<DatasetCardListProps> = ({ list }: DatasetCardListProps) => (
  <>
    {list.map((dataset) => (
      <div className="dataset-card-list-item-container mt-2.5 first:mt-0" key={dataset.id}>
        <DatasetListItem
          dataset={dataset}
          layer={dataset.layer ? dataset.layer.find((l) => l.default) : null}
          metadata={dataset.metadata}
=======
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
>>>>>>> 7d6ca14 (WIP)
        />
      </div>
    ))}
  </>
<<<<<<< HEAD
);
=======
)
>>>>>>> 7d6ca14 (WIP)

export default DatasetCardList;
