import { createCss } from '@stitches/react'

const { css, styled, global, getCssString } = createCss({
  theme: {
    fonts: {
      system: 'system-ui',
      mono: 'monospace'
    },
    colors: {
      grey: '#343a40',
      icon: '#f8f9fa',
      iconHover: '#e9ecef',
      headerBorderBottom: '#dee2e6' 
    },
    borderStyles: {
      note: '2px solid #343a40'
    },
    radii: {
      small: '0.6rem'
    },
    transitions: {
      medium: '0.25s'
    }
  },
  media: {
    bp1: '@media (min-width: 520px)',
    bp2: '@media (min-width: 900px)',
  },
})

const globalStyles = global({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
  },
  'html, body, #__next': {
    width: '100%',
    height: '100%',

    fontFamily: '$system'
  },
  body: {
    fontSize: '62.5%'
  }
})

export { css, styled, global, getCssString, globalStyles };