import { Root } from '@radix-ui/react-label';
import { styled } from '@styled';

const LabelStyled = styled(Root, {
  fontFamily: '$inter',
  fontSize: '1.6rem',
  fontWeight: 600,
  color: '$grey-700',
});

interface LabelProps {
  htmlFor: string;
}

const Label: React.FC<LabelProps> = ({ children, htmlFor }) => {
  return (
    <LabelStyled className="label" htmlFor={htmlFor}>
      {children}
    </LabelStyled>
  );
};

export default Label;
