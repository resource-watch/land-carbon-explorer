import { FC, useCallback } from 'react';

import cx from 'classnames';

import Icon from 'components/icon';

import ZOOM_IN_SVG from 'svgs/map/zoom-in.svg?sprite';
import ZOOM_OUT_SVG from 'svgs/map/zoom-out.svg?sprite';

import type { ZoomControlProps } from './types';

export const ZoomControl: FC<ZoomControlProps> = ({
  className,
  viewport,
  onZoomChange,
}: ZoomControlProps) => {
  const { zoom, maxZoom, minZoom } = viewport;

  const increaseZoom = useCallback(
    (e) => {
      e.stopPropagation();

      if (zoom + 1 <= maxZoom) {
        onZoomChange(zoom + 1);
      }
    },
    [zoom, maxZoom, onZoomChange]
  );

  const decreaseZoom = useCallback(
    (e) => {
      e.stopPropagation();

      if (zoom + 1 >= minZoom) {
        onZoomChange(zoom - 1);
      }
    },
    [zoom, minZoom, onZoomChange]
  );

  return (
    <div
      className={cx({
        'inline-flex flex-col': true,
        [className]: !!className,
      })}
    >
      <button
        className={cx({
          'mb-0.5 p-1.5 text-black bg-white ': true,
          'hover:bg-gray-100 active:bg-gray-600': zoom !== maxZoom,
          'opacity-50 cursor-default': zoom === maxZoom,
        })}
        aria-label="Zoom in"
        type="button"
        disabled={zoom === maxZoom}
        onClick={increaseZoom}
      >
        <Icon icon={ZOOM_IN_SVG} />
      </button>
      <button
        className={cx({
          'p-1.5 text-black bg-white': true,
          'hover:bg-gray-100 active:bg-gray-600': zoom !== minZoom,
          'opacity-50 cursor-default': zoom === minZoom,
        })}
        aria-label="Zoom out"
        type="button"
        disabled={zoom === minZoom}
        onClick={decreaseZoom}
      >
        <Icon icon={ZOOM_OUT_SVG} />
      </button>
    </div>
  );
};

export default ZoomControl;
