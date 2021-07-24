import { styled } from '@styled';

const CollectionBox = styled('div', {
  size: '5rem',
  borderRadius: '1rem',
  backgroundColor: '$grey-200',

  display: 'grid',
  placeItems: 'center',

  fontFamily: '$system',
  fontSize: '2rem',
  color: '$grey-800',

  transition: '$medium',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-300',
  },
});

export default CollectionBox;
