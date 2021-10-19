import { FC } from 'react';

import DatasetCardList from 'components/datasets/card-list';

import { useFetchDatasets } from 'hooks/dataset';

export const Sidebar: FC = () => {

  const { data: datasets } = useFetchDatasets(
    {},
    {
      placeholderData: [],
    }
  );

  return (
  <div className="w-72 h-full bg-white z-10 p-4 overflow-y-auto">
    <DatasetCardList list={datasets} />
  </div>)
};

export default Sidebar;
