import { Root, Thumb } from '@radix-ui/react-switch';
import { darkTheme, styled } from '@styled';

const StyledSwitch = styled(Root, {
  appearance: 'none',
  border: 'none',
  padding: 0,
  width: '6rem',
  height: '2.4rem',
  backgroundColor: '$grey-200',
  borderRadius: '2rem',
  position: 'relative',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px #343a40',
  },
  '&[data-state="checked"]': {
    backgroundColor: '$grey-800',
  },

  [`.${darkTheme} &`]: {
    backgroundColor: '$grey-200',

    '&[data-state="checked"]': {
      backgroundColor: '$grey-500',
    },
  },
});

const StyledThumb = styled(Thumb, {
  display: 'block',
  width: '2rem',
  height: '2rem',
  backgroundColor: 'white',
  borderRadius: '2rem',
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 2px',
  transition: 'transform 100ms',
  transform: 'translateX(1px)',
  willChange: 'transform',

  '&[data-state="checked"]': {
    transform: 'translateX(3.8rem)',
  },
});

export { StyledSwitch as Switch, StyledThumb as Thumb };
