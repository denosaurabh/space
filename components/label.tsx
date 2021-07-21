import { Root } from '@radix-ui/react-label';
import { styled } from '@styled';

const LabelStyled = styled(Root, {
  fontFamily: '$inter',
  fontSize: '1.6rem',
  fontWeight: 600,
  color: '$grey-700',

  display: 'flex',
  alignItems: 'center',

  variants: {
    color: {
      light: { color: '$grey-500' },
    },
  },
});

interface LabelProps {
  htmlFor: string;
  color?: 'light';
}

const Label: React.FC<LabelProps> = ({ children, htmlFor, color }) => {
  return (
    <LabelStyled className="label" color={color} htmlFor={htmlFor}>
      {children}
    </LabelStyled>
  );
};

export default Label;
