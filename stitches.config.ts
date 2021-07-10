import { createCss } from '@stitches/react';

const { css, styled, global, getCssString } = createCss({
  theme: {
    fonts: {
      system: 'system-ui',
      mono: 'monospace',
      inter:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
    colors: {
      grey: '#343a40',
      icon: '#f8f9fa',
      iconHover: '#e9ecef',
      headerBorderBottom: '#dee2e6',
      green: '#34a0a4',
      lightGreen: '#52b69a',
    },
    borderStyles: {
      note: '2px solid #343a40',
    },
    radii: {
      small: '0.6rem',
    },
    transitions: {
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
  },
  media: {
    bp1: '@media (min-width: 520px)',
    bp2: '@media (min-width: 900px)',
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
    height: '100%',

    fontFamily: '$system',
  },
  body: {
    fontSize: '62.5%',
  },
});

export { css, styled, global, getCssString, globalStyles };
