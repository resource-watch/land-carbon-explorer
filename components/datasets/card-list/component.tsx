import { FC } from 'react';

// components
import DatasetListItem from '../card-item';

// styles
import './styles.scss';

import { Dataset } from 'types';

export interface DatasetCardList {
  list: Dataset[];
}

export const DatasetCardList: FC<> = ({
  list,
  actions,
  tags,
  expandedChart,
}) {

  return (
    <div className="relative">
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
            actions={actions}
            tags={tags}
            expandedChart={expandedChart}
          />
        </div>
      ))}
    </div>
  );
}

DatasetCardList.defaultProps = {
  expandedChart: false,
  tags: [],
  loading: false,
  numberOfPlaceholders: 4,
};

DatasetCardList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({

    }),
  ).isRequired,
  actions: PropTypes.node.isRequired,
  tags: PropTypes.node,
  expandedChart: PropTypes.bool,
};

export default DatasetCardList;
