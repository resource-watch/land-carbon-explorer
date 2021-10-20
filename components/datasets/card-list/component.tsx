import { FC } from 'react';

// components
import { Dataset } from 'types';

import DatasetListItem from '../card-item';

// styles
// import './styles.scss';

export interface DatasetCardListProps {
  list: Dataset[];
}

export const DatasetCardList: FC<DatasetCardListProps> = ({ list }: DatasetCardListProps) => (
  <>
    {list.map((dataset) => (
      <div className="dataset-card-list-item-container mt-2.5 first:mt-0" key={dataset.id}>
        <DatasetListItem
          dataset={dataset}
          layer={dataset.layer ? dataset.layer.find((l) => l.default) : null}
          metadata={dataset.metadata}
        />
      </div>
    ))}
  </>
);

export default DatasetCardList;
