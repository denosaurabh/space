import { darkTheme, styled } from '@styled';
import { Root, Trigger, Content, Item } from '@radix-ui/react-context-menu';

const StyledContent = styled(Content, {
  minWidth: '10rem',
  backgroundColor: '$grey-100',
  borderRadius: '1rem',
  padding: '0.8rem 0',
  boxShadow: '0px 5px 15px -8px grey',

  [`.${darkTheme} &`]: {
    boxShadow: '0px 5px 15px -8px grey',
  },
});

const StyledItem = styled(Item, {
  fontFamily: '$inter',
  fontSize: '1.4rem',
  color: '$grey-700',
  padding: '1rem 1.6rem',

  transition: '$fast',

  '&:focus': {
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: '$grey-200',
    color: '$grey-800',
  },
});

export { Root, Trigger, StyledContent, StyledItem };
