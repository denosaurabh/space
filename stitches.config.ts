import { createCss } from '@stitches/react';

const { css, styled, global, getCssString, theme } = createCss({
  theme: {
    fonts: {
      system: 'system-ui',
      mono: 'monospace',
      inter:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      indie: 'IndieFlower',
    },
    colors: {
      // lightGreen: '#52b69a',
      'grey-100': '#f8f9fa',
      'grey-200': '#e9ecef',
      'grey-300': '#dee2e6',
      'grey-400': '#ced4da',
      'grey-500': '#adb5bd',
      'grey-600': '#6c757d',
      'grey-700': '#495057',
      'grey-800': '#343a40',
      'grey-900': '#212529',

      'yellow-light': '#fffed6',
      yellow: '#ffb703',
      'yellow-dark': '#ff7b00',

      orange: '#ff6d00',
      green: '#34a0a4',
      red: '#f94144',
      'red-light': '#fff0f3',

      'dreamy-gradients-yellow': `#FFAA6C`,
      'dreamy-gradients-orange': `radial-gradient(111.63% 111.63% at 42.64% -5.82%, #FFA800 33.65%, #FF0000 44.58%, #FF47D6 100%)`,
      'dreamy-gradients-red': `radial-gradient(111.63% 111.63% at 42.64% -5.82%, #FF0000 33.65%, #FF47D6 44.58%, #FFA800 100%)`,
      'dreamy-gradients-purple': `linear-gradient(141.55deg, #575EFF -3.79%, #E478FF 82.82%);`,
      'dreamy-gradients-blue': `radial-gradient(111.63% 111.63% at 42.64% -5.82%, #00AAFF 33.65%, #00AAFF 44.58%, #00AAFF 100%)`,
      'dreamy-gradients-green': `linear-gradient(180deg, #00FF85 0%, rgba(0, 255, 71, 0) 100%);`,
    },
    borderStyles: {
      note: '2px solid #343a40',
    },
    radii: {
      small: '1.1rem',
    },
    transitions: {
      slow: '0.45s',
      medium: '0.25s',
      fast: '0.1s',
    },
  },
  utils: {
    flexRow: () => () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    flexColumn: () => (justifyContent) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: `${justifyContent}`,
    }),
    size: () => (size) => ({
      width: `${size}`,
      height: `${size}`,
    }),
    annoPos: () => (position: string) => {
      const [top, right, bottom, left] = position.split(' ');

      return {
        '.anno': {
          top,
          right,
          bottom,
          left,
        },
      };
    },
  },
  media: {
    ['mobile-small']: '(max-width: 300px)',
    mobile: '(max-width: 480px)',
    tablet: '(max-width: 768px)',
    laptop: '(max-width: 1024px)',
    desktop: '(max-width: 1200px)',
    tv: '(min-width: 1201px)',
  },
});

const darkTheme = theme('dark-theme', {
  colors: {
    'grey-900': '#f8f9fa',
    'grey-800': '#e9ecef',
    'grey-700': '#dee2e6',
    'grey-600': '#ced4da',
    'grey-500': '#adb5bd',
    'grey-400': '#6c757d',
    'grey-300': '#495057',
    'grey-200': '#343a40',
    'grey-100': '#212529',
  },
});

const globalStyles = global({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  'html, body, #__next': {
    width: '100%',
    minHeight: '100vh',
    height: 'fit-content',

    fontSize: '62.5%',
    fontFamily: '$inter',
    fontWeight: 400,
    textRendering: 'optimizeLegibility',

    overflowX: 'hidden',

    '@laptop': {
      fontSize: '58%',
    },
    '@tablet': {
      fontSize: '54%',
    },
    '@mobile': {
      fontSize: '48%',
    },
    '@mobile-small': {
      fontSize: '42%',
    },
  },
  span: {
    fontSize: '2rem',
  },
  a: {
    textDecoration: 'none',
  },
  button: {
    // outline: 'none',
    border: 'none',
  },
  input: {
    border: 'none',
    outline: 'none',
  },
  '.annotation': {
    userSelect: 'none',
  },

  '@font-face': {
    fontFamily: 'IndieFlower',
    src: `url('/assets/fonts/IndieFlower-Regular.woff2') format('woff2'),
        url('/assets/fonts/IndieFlower.woff') format('woff'),
        url('/assets/fonts/IndieFlower.ttf') format('truetype'),
        url('/assets/fonts/IndieFlower-Regular.eot?#iefix') format('embedded-opentype')`,
    fontWeight: 'normal',
    fontStyle: 'normal',
  },
  '::-webkit-scrollbar': {
    width: '3px',
  },
  '::-webkit-scrollbar-track': {
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb': {
    background: '$grey-800',
    borderRadius: '10px',
  },
});

export { css, styled, global, getCssString, globalStyles, darkTheme, theme };
