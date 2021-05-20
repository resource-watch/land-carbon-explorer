export const flipModifier = {
  name: 'flip',
  enabled: true,
};

export const hideModifier = {
  name: 'hide',
  enabled: true,
};

export const offsetModifier = {
  name: 'offset',
  enabled: true,
  options: {
    offset: ({ placement, reference }) => {
      if (placement === 'top') {
        return [0, -reference.height];
      }
      if (placement === 'bottom') {
        return [0, -reference.height];
      }
      return [0, 0];
    },
  },
};

export const sameWidthModifier = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state: s }) => {
    // eslint-disable-next-line
      s.styles.popper.minWidth = `${s.rects.reference.width}px`;
  },
  effect: ({ state: s }) => {
    // eslint-disable-next-line
      s.elements.popper.style.minWidth = `${s.elements.reference.offsetWidth}px`;
  },
};
