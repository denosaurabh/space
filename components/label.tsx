import { Root } from '@radix-ui/react-label';
import type * as Stitches from '@stitches/react';
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
  css?: Stitches.CSS;
  children: React.ReactNode;
}

const Label = ({ children, htmlFor, color, css }: LabelProps) => {
  return (
    <LabelStyled className="label" color={color} htmlFor={htmlFor} css={css}>
      {children}
    </LabelStyled>
  );
};

export default Label;
