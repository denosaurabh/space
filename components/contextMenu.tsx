import { styled } from '@styled';
import { Root, Trigger, Content, Item } from '@radix-ui/react-context-menu';

const StyledContent = styled(Content, {
  minWidth: '10rem',
  backgroundColor: 'white',
  borderRadius: '1rem',
  padding: '0.8rem',
  boxShadow: '0px 5px 15px -5px grey',
});

const StyledItem = styled(Item, {
  fontFamily: '$inter',
  fontSize: '1.4rem',
  padding: '1.2rem 1.6rem',
  borderRadius: '0.8rem',

  transition: '$fast',

  '&:focus': {
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: '$grey-900',
    color: 'white',
  },
});

export { Root, Trigger, StyledContent, StyledItem };
