import { FC, useCallback, useState } from 'react';

import cx from 'classnames';

import { useId } from '@react-aria/utils';

import Icon from 'components/icon';

import LEGEND_SVG from 'svgs/map/legend.svg?sprite';
import ARROW_DOWN_SVG from 'svgs/ui/arrow-down.svg?sprite';

import SortableList from './sortable/list';
import type { LegendProps } from './types';

export const Legend: FC<LegendProps> = ({
  children,
  className = '',
  maxHeight,
  onChangeOrder,
}: LegendProps) => {
  const [active, setActive] = useState(true);

  const id = useId();

  const onToggleActive = useCallback(() => {
    setActive(!active);
  }, [active]);

  return (
    <div
      className={cx({
        'bg-black rounded-3xl flex flex-col flex-grow max-w-lg': true,
        [className]: !!className,
      })}
    >
      <button
        type="button"
        aria-expanded={active}
        aria-controls={id}
        className={cx({
          'relative flex items-center  px-5 py-3 space-x-2 text-xs text-white uppercase font-heading focus:outline-none':
            true,
          'w-full': active,
          'w-40': !active,
        })}
        onClick={onToggleActive}
      >
        <Icon icon={LEGEND_SVG} className="w-4 h-4 text-gray-300" />
        <span>Legend</span>

        <Icon
          icon={ARROW_DOWN_SVG}
          className={cx({
            'absolute w-3 h-3 transition-transform transform -translate-y-1/2 text-rw-pink top-1/2 right-5':
              true,
            'rotate-180': active,
          })}
        />
      </button>

      {active && (
        <div
          className="relative flex flex-col flex-grow overflow-hidden rounded-3xl"
          style={{
            maxHeight,
          }}
        >
          <div className="absolute top-0 left-0 z-10 w-full h-4 pointer-events-none bg-gradient-to-b from-black via-black" />
          <div className="overflow-x-hidden overflow-y-auto">
            <SortableList onChangeOrder={onChangeOrder}>{children}</SortableList>
          </div>
          <div className="absolute bottom-0 left-0 z-10 w-full h-3 pointer-events-none bg-gradient-to-t from-black via-black" />
        </div>
      )}
    </div>
  );
};

export default Legend;
