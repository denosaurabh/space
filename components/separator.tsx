import { Root } from '@radix-ui/react-separator';
import { styled } from '@styled';

const SeperatorStyled = styled(Root, {
  backgroundColor: '$grey-300',

  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 },
});

interface SeperatorProps {
  css?: Record<string, unknown>;
  [key: string]: unknown;
}

const Seperator: React.FC<SeperatorProps> = ({ css, ...props }) => {
  return <SeperatorStyled css={css} {...props} />;
};

export default Seperator;
