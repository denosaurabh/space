import { styled } from '@styled';

const Button = styled('button', {
  fontFamily: '$inter',
  fontSize: '1.4rem',
  fontWeight: 'bold',

  borderRadius: '10000px',
  variants: {
    color: {
      dark: {
        backgroundColor: '$grey-800',
        color: '$grey-100',
        boxShadow: '0px 14px 22px rgba(0, 0, 0, 0.25)',
      },
      light: {
        backgroundColor: '$grey-100',
        color: '$grey-800',
        boxShadow: '0px 14px 22px rgba(0, 0, 0, 0.25)',
      },
    },
    size: {
      mega: {
        fontSize: '2.4rem',
        padding: '2.8rem 5rem',
      },
      medium: {
        padding: '1.4rem 2rem',
      },
      small: {
        padding: '1rem 1.6rem',
      },
    },
  },

  transition: '$medium',

  '&:hover': {
    cursor: 'pointer',
    transform: 'translateY(-4px) scale(1.03)',
  },

  '&:active': {
    cursor: 'pointer',
    transform: 'translateY(0px) scale(0.98)',
  },
});

export default Button;
