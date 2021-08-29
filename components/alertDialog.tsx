import {
  Root,
  Trigger,
  Overlay,
  Content,
  Title,
  Description,
  Cancel,
  Action,
} from '@radix-ui/react-alert-dialog';
import { styled, darkTheme } from '@styled';

const StyledTrigger = styled(Trigger, {
  backgroundColor: 'transparent',
});

const StyledOverlay = styled(Overlay, {
  backgroundColor: 'rgba(0, 0, 0, .15)',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,

  backdropFilter: 'blur(2px)',
});

const StyledContent = styled(Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '50rem',
  backgroundColor: '$grey-100',
  borderRadius: '1.6rem',
  padding: '4rem 3.5rem',


  [`.${darkTheme} &`]: {
    backgroundColor: '$grey-100',
  },
});

const StyledTitle = styled(Title, {
  fontFamily: '$inter',
  fontSize: '4rem',
  marginBottom: '3rem',

  [`.${darkTheme} &`]: {
    color: '$grey-700',
  },
});

const StyledDescription = styled(Description, {
  fontSize: '1.4rem',
  color: '$grey-800',

  marginBottom: '4rem',
});

const StyledCancel = styled(Cancel, {
  fontFamily: '$inter',
  fontSize: '1.4rem',
  fontWeight: 'bold',

  padding: '1.4rem 2rem',

  backgroundColor: '$grey-100',
  color: '$grey-900',
  borderRadius: '1rem',

  transition: '$medium background-color',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-200',
  },
});

const StyledAction = styled(Action, {
  fontFamily: '$inter',
  fontSize: '1.4rem',
  fontWeight: 'bold',

  padding: '1.4rem 2rem',
  marginRight: '1rem',

  backgroundColor: '$grey-800',
  color: '$grey-100',
  borderRadius: '1rem',

  transition: '$medium background-color',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-900',
  },

  '&:disabled': {
    cursor: 'not-allowed',
  },
});

export {
  Root,
  StyledTrigger as Trigger,
  StyledOverlay,
  StyledContent,
  StyledTitle,
  StyledDescription,
  StyledCancel,
  StyledAction,
};
