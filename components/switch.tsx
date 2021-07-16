import { Root, Thumb } from '@radix-ui/react-switch';
import { styled } from '@styled';

const StyledSwitch = styled(Root, {
  appearance: 'none',
  border: 'none',
  padding: 0,
  width: '3rem',
  height: '1.4rem',
  backgroundColor: '$grey-200',
  borderRadius: '2rem',
  position: 'relative',
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px #0077b6',
  },
  '&[data-state="checked"]': {
    backgroundColor: '#0077b6',
  },
});

const StyledThumb = styled(Thumb, {
  display: 'block',
  width: '1rem',
  height: '1.1rem',
  backgroundColor: 'white',
  borderRadius: '2rem',
  boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 2px',
  transition: 'transform 100ms',
  transform: 'translateX(1px)',
  willChange: 'transform',

  '&[data-state="checked"]': {
    transform: 'translateX(1.8rem)',
  },
});

const Switch: React.FC = () => {
  return (
    <StyledSwitch>
      <StyledThumb />
    </StyledSwitch>
  );
};

export default Switch;
