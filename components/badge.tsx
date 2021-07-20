import { styled } from '@styled';

const StyledBadge = styled('div', {
  width: 'fit-content',
  padding: '1.4rem 2.2rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  borderRadius: '1000px',
  backgroundColor: '#d8f3dc',

  fontFamily: '$inter',
  color: '#40916c',
  fontSize: '1.2rem',
  fontWeight: 'bolder',
  transition: 'background-color $medium',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#b7e4c7',
  },
});

const Badge: React.FC = ({ children }) => {
  return <StyledBadge>{children}</StyledBadge>;
};

export default Badge;
