import { createCss } from '@stitches/react';

const { css, styled, global, getCssString, theme } = createCss({
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
      'grey-100': '#f8f9fa',
      'grey-200': '#e9ecef',
      'grey-300': '#dee2e6',
      'grey-400': '#ced4da',
      'grey-500': '#adb5bd',
      'grey-600': '#6c757d',
      'grey-700': '#495057',
      'grey-800': '#343a40',
      'grey-900': '#212529',
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
    size: () => (size) => ({
      width: `${size}`,
      height: `${size}`,
    }),
  },
  media: {
    bp1: '@media (min-width: 520px)',
    bp2: '@media (min-width: 900px)',
  },
});

const darkTheme = theme({
  colors: {
    grey: '#343a40',
    icon: '#f8f9fa',
    iconHover: '#e9ecef',
    headerBorderBottom: '#dee2e6',
    green: '#34a0a4',
    lightGreen: '#52b69a',
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
    height: '100%',

    fontFamily: '$inter',
  },
  a: {
    textDecoration: 'none',
  },
  button: {
    outline: 'none',
    border: 'none',
  },
  input: {
    border: 'none',
    outline: 'none',
  },
  body: {
    fontSize: '62.5%',
  },
  '::-webkit-scrollbar': {
    width: '3px',
  },
  '::-webkit-scrollbar-track': {
    borderRadius: '10px',
  },

  '::-webkit-scrollbar-thumb': {
    background: '$grey',
    borderRadius: '10px',
  },
});

export { css, styled, global, getCssString, globalStyles, darkTheme };
