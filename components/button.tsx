import { styled } from '@styled';

const Button = styled('button', {
  fontFamily: '$inter',
  fontSize: '1.4rem',
  fontWeight: 'bold',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',

  borderRadius: '10000px',

  variants: {
    color: {
      dark: {
        backgroundColor: '$grey-800',
        color: '$grey-100',
        boxShadow: '0px 1.4rem 2rem rgba(0, 0, 0, 0.25)',

        svg: {
          fill: '$grey-800',
        },

        '@mobile': {
          boxShadow: '0px 0.6rem 1rem rgba(0, 0, 0, 0.25)',
        },

        '&:disabled': {
          backgroundColor: '$grey-600',
          color: '$grey-100',
          boxShadow: '0px 0.2rem 1rem rgba(0, 0, 0, 0.25)',
        },
      },
      light: {
        backgroundColor: '$grey-100',
        color: '$grey-800',
        boxShadow: '0px 1.4rem 2rem rgba(0, 0, 0, 0.25)',

        svg: {
          fill: '$grey-800',
        },

        '@mobile': {
          boxShadow: '0px 0.6rem 1rem rgba(0, 0, 0, 0.25)',
        },

        '&:disabled': {
          backgroundColor: '$grey-300',
          color: '$grey-700',
        },
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

  defaultVariants: {
    color: 'dark',
    size: 'medium',
  },
});

export default Button;
