import { styled } from '@styled';

const StyledBadge = styled('div', {
  width: 'fit-content',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  margin: '0 1rem',

  fontFamily: '$inter',
  fontWeight: 'bolder',
  transition: 'background-color $medium',

  '&:hover': {
    cursor: 'pointer',
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
      grey: {
        backgroundColor: '$grey-200',
        color: '$grey-800',

        '&:hover': {
          backgroundColor: '$grey-300',
        },
      },
    },
    size: {
      mini: {
        padding: '0.4rem 1rem',
        borderRadius: '1rem',
        fontSize: '1rem',
      },
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
  size?: 'mini' | 'medium' | 'large';
  color?: 'green' | 'warning' | 'grey';
  css?: Record<string, unknown>;
}

const Badge: React.FC<BadgeProps> = ({ children, size, color, css }) => {
  return (
    <StyledBadge size={size} color={color} css={css}>
      {children}
    </StyledBadge>
  );
};

export default Badge;
