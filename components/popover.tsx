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
  backgroundColor: '$grey-800',
  padding: '0.6rem 0.7rem 0.6rem 1.2rem',
  borderRadius: '1rem',

  fontFamily: '$inter',
  fontSize: '0.8rem',
  color: '$grey-100',
});

const StyledClose = styled(Close, {
  padding: '0.5rem 0.7rem',
  marginLeft: '1rem',

  borderRadius: '0.6rem',
  backgroundColor: '$grey-100',

  fontFamily: '$inter',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  color: '$grey-900',

  transition: '$medium',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-200',
  },
});

export { Root, StyledTrigger, Anchor, StyledContent, StyledClose, Arrow };
