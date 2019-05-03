import { css } from 'styled-components';

const emSize = (size) => (`${size / 16}em`);

// add other breakpoint here
const breakpoints = {
  desktop: {
    option: {
      'min-width': emSize(1025),
    },
  },
  mobile: {
    option: {
      'max-width': emSize(1024),
    },
  },
  gt768: {
    option: {
      'min-width': emSize(769),
    },
  },
  lt768: {
    option: {
      'max-width': emSize(768),
    },
  },
  gt667: {
    option: {
      'min-width': emSize(668),
    },
  },
  lt667: {
    option: {
      'max-width': emSize(667),
    },
  },
  gt480: {
    option: {
      'min-width': emSize(481),
    },
  },
  lt480: {
    option: {
      'max-width': emSize(480),
    },
  },
  iphone4: {
    option: {
      'min-device-width': emSize(320),
      'max-device-height': emSize(480),
    },
  },
  iphone5: {
    option: {
      'min-device-width': emSize(320),
      'max-device-height': emSize(568),
    },
  },
  iphone45: {
    option: {
      'max-device-width': emSize(320),
    },
  },
  ipadPortrait: {
    option: {
      'device-width': emSize(768),
      'device-height': emSize(1024),
      orientation: 'portrait',
    },
  },
  ipadLandscape: {
    option: {
      'min-device-width': emSize(768),
      'max-device-width': emSize(1024),
      orientation: 'landscape',
    },
  },
  ipad: {
    'media-type': 'only screen',
    option: {
      'min-device-width': emSize(768),
      'max-device-width': emSize(1024),
    },
  },
  print: {
    'media-type': 'print',
    option: {},
  },
};

const media = Object.keys(breakpoints).reduce((accumulator, label) => {
  const breakpoint = breakpoints[label];
  const joiner = (opt) => `(${opt}: ${breakpoint.option[opt]})`;
  const options = `${Object.keys(breakpoint.option).map(joiner).join(' and ')}`;
  const mediaType = `${breakpoint['media-type'] ? `${breakpoint['media-type']}` : ''}`;

  return {
    ...accumulator,
    [label]: (...args) => css`
      @media ${mediaType && options ? `${mediaType} and ` : `${mediaType}`}${options} {
        ${css(...args)}
      }
    `,
  };
}, {});

export default media;
