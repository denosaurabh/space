import { Root, Track, Range, Thumb } from '@radix-ui/react-slider';
import { styled, theme } from '@styled';

const StyledRoot = styled(Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '100%',

  '&[data-orientation="horizontal"]': {
    height: '2rem',
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: '2rem',
    height: '100%',
  },
});

const StyledTrack = styled(Track, {
  backgroundColor: '$grey-300',
  position: 'relative',
  flexGrow: 1,
  borderRadius: '10000px',

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
});

const StyledRange = styled(Range, {
  position: 'absolute',
  backgroundColor: '$grey-300',
  borderRadius: '10000px',
  height: '100%',
});

const StyledThumb = styled(Thumb, {
  all: 'unset',
  display: 'block',
  width: 20,
  height: 20,
  backgroundColor: 'white',
  boxShadow: `0 2px 10px ${theme.colors['grey-400']}`,
  borderRadius: 10,
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-600',
  },
  '&:focus': {
    boxShadow: `0 0 0 5px ${theme.colors['grey-400']}`,
  },
});

export {
  StyledRoot as Root,
  StyledTrack as Track,
  StyledRange as Range,
  StyledThumb as Thumb,
};
