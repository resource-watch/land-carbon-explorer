import { Children, FC } from 'react';

import cx from 'classnames';

import type { ControlsProps } from './types';

export const Controls: FC<ControlsProps> = ({
  className = 'absolute bottom-10 left-2',
  children,
}: ControlsProps) => (
  <div
    className={cx({
      'w-10': true,
      [className]: !!className,
    })}
  >
    {Children.map(children, (child, i) => (
      <div
        className={cx({
          'mt-2': i !== 0,
        })}
      >
        {child}
      </div>
    ))}
  </div>
);

export default Controls;
