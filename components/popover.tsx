import {
  Root,
  Trigger,
  Anchor,
  Content,
  Close,
  Arrow,
} from '@radix-ui/react-popover';

import { darkTheme, styled } from '@styled';

const StyledTrigger = styled(Trigger, {
  display: 'grid',
  placeItems: 'center',

  backgroundColor: 'transparent',
});

const StyledContent = styled(Content, {
  display: 'flex',
  placeItems: 'center',
  gap: '1rem',

  backgroundColor: '$grey-800',
  padding: '1rem 1rem 1rem 2rem',
  borderRadius: '1.4rem',

  fontFamily: '$inter',
  fontSize: '1.4rem',
  color: '$grey-100',

  '@mobile': {
    padding: '0.7rem 0.7rem 0.7rem 1.5rem',
  },

  variants: {
    color: {
      light: {
        backgroundColor: '$grey-100',
        color: '$grey-800',
      },
    },

    dropShadow: {
      true: {
        boxShadow: '4px 8px 22px rgba(167, 167, 167, 0.25)',
        [`.${darkTheme} &`]: {
          boxShadow: '4px 8px 22px rgba(167, 167, 167, 0.05)',
        },
      },
    },
  },
});

const StyledClose = styled(Close, {
  padding: '1rem 1.4rem',
  marginLeft: '1rem',

  borderRadius: '1rem',
  backgroundColor: '$grey-100',

  fontFamily: '$inter',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  color: '$grey-900',

  transition: '$medium',

  '@mobile': {
    padding: '0.8rem 1rem',
  },

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-200',
  },

  [`svg`]: {
    fill: '$grey-800',
  },
});

const StyledButton = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',

  width: '90%',
  padding: '1rem 2rem',
  paddingLeft: '1.2rem',

  border: '1px solid $grey-300',
  borderRadius: '0.8rem',

  fontSize: '1.4rem',
  fontWeight: '500',
  color: '$grey-800',

  transition: '$fast',

  svg: {
    width: '20',

    fill: '$grey-600',
  },

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-200',
    color: '$grey-800',

    svg: {
      fill: '$grey-700',
    },

    [`.${darkTheme} &`]: {
      backgroundColor: '$grey-200',
      color: '$grey-700',

      svg: {
        fill: '$grey-700',
      },
    },
  },
});

const StyledArrow = styled(Arrow, {
  color: '$grey-800',

  '@mobile': {
    opacity: '0',
  },

  variants: {
    color: {
      light: {
        color: '$grey-200',
      },
    },
  },
});

export {
  Root,
  StyledTrigger,
  Anchor,
  StyledButton,
  StyledContent,
  StyledClose,
  StyledArrow,
};
