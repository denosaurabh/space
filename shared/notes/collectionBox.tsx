import { styled } from '@styled';

const CollectionBox = styled('div', {
  size: '3rem',
  borderRadius: '0.5rem',
  backgroundColor: '$grey-200',

  display: 'grid',
  placeItems: 'center',

  fontFamily: '$system',
  fontSize: '1.4rem',

  transition: '$medium',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-300',
  },
});

export default CollectionBox;
