import { styled } from '@styled';

const Container = styled('div', {
  width: 'auto',
  height: 'fit-content',

  padding: '2rem',
  border: '2px solid',
  borderRadius: '$small',

  fontSize: '1.6rem',
  fontWeight: '600',
  lineHeight: '26px',

  variants: {
    color: {
      warning: {
        // backgroundColor: '$yellow-light',
        borderColor: '$yellow',
        color: '$yellow-dark',
      },
      success: {
        borderColor: '$green',
        color: '$grey-800',
      },
    },
  },
});

interface WarningBox {
  status: 'warning' | 'success';
}

const WarningBox: React.FC<WarningBox> = ({ children, status }) => {
  return <Container color={status}>{children}</Container>;
};

export default WarningBox;
