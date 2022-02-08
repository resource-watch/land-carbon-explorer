import { FC, useCallback } from 'react';

import { useDispatch } from 'react-redux';

import cx from 'classnames';

import { setSidebar } from 'store/features/ui/sidebar';
import { useAppSelector } from 'store/hooks';

import { useFetchDatasets } from 'hooks/dataset';

import DatasetCardList from 'components/datasets/card-list';
import Icon from 'components/icon';
import { AppDispatch } from 'store';

import ARROW_LEFT_SVG from 'svgs/ui/arrow-left.svg?sprite';
import ARROW_RIGHT_SVG from 'svgs/ui/arrow-right.svg?sprite';

export const Sidebar: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen);

  const { data: datasets } = useFetchDatasets(
    {},
    {
      placeholderData: [],
    }
  );

  const handleClick = useCallback(() => {
    dispatch(setSidebar(!isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <div
      className={cx({
        'w-80 h-full bg-white z-10 absolute transition transform translate-x-0': true,
        '-translate-x-full': isSidebarOpen,
      })}
    >
      <button
        onClick={handleClick}
        type="button"
        className="absolute bg-rw-gray-3  text-white -right-7 top-5 z-50 py-3 px-2 focus:outline-none"
      >
        <Icon icon={isSidebarOpen ? ARROW_RIGHT_SVG : ARROW_LEFT_SVG} className="w-3" />
      </button>
      <div className="p-4 h-full overflow-y-auto">
        <h2>Global Land Cover Change</h2>

        <p className="text-sm">
          Data developed by the University of Maryland in partnership with{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://landcarbonlab.org/">
            Land & Carbon Lab
          </a>
          .
        </p>
        <p className="text-sm">
          Questions? Feedback?{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://landcarbonlab.org/contact-us">
            Get in touch
          </a>
          !
        </p>
        <div className="my-5">
          <DatasetCardList list={datasets} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
