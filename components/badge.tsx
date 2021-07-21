import { styled } from '@styled';

const StyledBadge = styled('div', {
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  margin: '0 1rem',

  backgroundColor: '#d8f3dc',

  fontFamily: '$inter',
  color: '#40916c',
  fontWeight: 'bolder',
  transition: 'background-color $medium',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#b7e4c7',
  },

  variants: {
    color: {
      green: {
        backgroundColor: '#d8f3dc',
        color: '#40916c',

        '&:hover': {
          backgroundColor: '#b7e4c7',
        },
      },
      warning: {
        backgroundColor: '#F1BBBB',
        color: '#DE6262',

        '&:hover': {
          backgroundColor: '#F1BBBB',
        },
      },
    },
    size: {
      medium: {
        padding: '0.8rem 1.6rem',
        borderRadius: '2rem',
        fontSize: '1.2rem',
      },
      large: {
        padding: '1.4rem 2.2rem',
        borderRadius: '1000px',
        fontSize: '1.2rem',
      },
    },
  },

  defaultVariants: {
    color: 'green',
    size: 'large',
  },
});

interface BadgeProps {
  size?: 'medium' | 'large';
  color?: 'green' | 'warning';
}

const Badge: React.FC<BadgeProps> = ({ children, size, color }) => {
  return (
    <StyledBadge size={size} color={color}>
      {children}
    </StyledBadge>
  );
};

export default Badge;
