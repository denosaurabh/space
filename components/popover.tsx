import {
  Root,
  Trigger,
  Anchor,
  Content,
  Close,
  Arrow,
} from '@radix-ui/react-popover';

import { styled } from '@styled';

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
});

const StyledArrow = styled(Arrow, {
  color: '$grey-800',

  '@mobile': {
    opacity: '0',
  },
});

export { Root, StyledTrigger, Anchor, StyledContent, StyledClose, StyledArrow };
