import { styled } from '@styled';
import { Root, Trigger, Content, Item } from '@radix-ui/react-context-menu';

const StyledContent = styled(Content, {
  minWidth: '10rem',
  backgroundColor: 'white',
  borderRadius: '0.5rem',
  padding: '0.5rem',
  boxShadow: '0px 5px 15px -5px grey',
});

const StyledItem = styled(Item, {
  fontFamily: '$inter',
  fontSize: '0.9rem',
  padding: '0.7rem 1rem',
  borderRadius: '0.5rem',

  '&:focus': {
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: '$grey-900',
    color: 'white',
  },
});

export { Root, Trigger, StyledContent, StyledItem };
