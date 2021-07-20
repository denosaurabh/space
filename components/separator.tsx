import { Root } from '@radix-ui/react-separator';
import { styled } from '@styled';

const SeperatorStyled = styled(Root, {
  backgroundColor: '$grey-300',

  '&[data-orientation=horizontal]': { height: 1, width: '100%' },
  '&[data-orientation=vertical]': { height: '100%', width: 1 },
});

interface SeperatorProps {
  [key: string]: unknown;
}

const Seperator: React.FC<SeperatorProps> = ({ ...props }) => {
  return <SeperatorStyled {...props} />;
};

export default Seperator;
