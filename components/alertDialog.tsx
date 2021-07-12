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
import { styled } from '@styled';

const StyledOverlay = styled(Overlay, {
  backgroundColor: 'rgba(0, 0, 0, .15)',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
});

const StyledContent = styled(Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  width: '30rem',
  backgroundColor: 'white',
  borderRadius: '1.2rem',
  padding: '2rem',
});

const StyledTitle = styled(Title, {
  fontFamily: '$inter',
  fontSize: '2rem',
  marginBottom: '2rem',
});

const StyledDescription = styled(Description, {
  marginBottom: '3rem',
});

const StyledCancel = styled(Cancel, {
  fontFamily: '$inter',
  fontSize: '0.9rem',
  fontWeight: 'bold',

  padding: '1rem 1.2rem',

  backgroundColor: '$grey-100',
  color: '$grey-900',
  borderRadius: '0.5rem',

  transition: '$medium background-color',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-200',
  },
});

const StyledAction = styled(Action, {
  fontFamily: '$inter',
  fontSize: '0.9rem',
  fontWeight: 'bold',

  padding: '1rem 1.2rem',
  marginRight: '1rem',

  backgroundColor: '$grey-800',
  color: '$grey-100',
  borderRadius: '0.5rem',

  transition: '$medium background-color',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-900',
  },
});

export {
  Root,
  Trigger,
  StyledOverlay,
  StyledContent,
  StyledTitle,
  StyledDescription,
  StyledCancel,
  StyledAction,
};
