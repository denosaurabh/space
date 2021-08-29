import { styled } from '@styled';

import {
  Root as PopoverRoot,
  StyledTrigger as PopoverTrigger,
  Anchor as PopoverAnchor,
  StyledContent as PopoverContent,
  StyledButton as PopoverButton,
} from '@components/popover';

import MenuSvg from '@assets/svg/Menu.svg';
import DeleteSvg from '@assets/svg/Trash.svg';

interface PomoBoxProps {
  heading: string;
  span: string;
}

const PomoBox: React.FC<PomoBoxProps> = ({ heading, span }) => {
  return (
    <PomoBoxStyled>
      <PomoBoxHeading>{heading}</PomoBoxHeading>
      <PomoBoxSpan>{span}</PomoBoxSpan>
      <PopoverRoot>
        <PopoverTrigger>
          <MenuSvgStyled />
        </PopoverTrigger>
        <PopoverAnchor />

        <PopoverContent
          color="light"
          dropShadow
          css={{
            width: '18rem',
            padding: '1rem 0.4rem',
            flexDirection: 'column',
          }}
        >
          <PopoverButton>&uarr; Switch Up</PopoverButton>
          <PopoverButton>&darr; Switch Down</PopoverButton>
          <PopoverButton>
            <DeleteSvg width={15} height={15} />
            Delete
          </PopoverButton>
        </PopoverContent>
      </PopoverRoot>
    </PomoBoxStyled>
  );
};

export default PomoBox;

const PomoBoxStyled = styled('div', {
  width: '40rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '1px solid $grey-300',
  borderRadius: '16px',

  padding: '2rem 3rem',
  paddingRight: '1.5rem',

  transition: '$medium',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-200',
  },
});

const PomoBoxHeading = styled('h6', {
  fontFamily: '$inter',
  fontSize: '1.6rem',
  fontWeight: 500,
  color: '$grey-900',

  marginRight: 'auto',
});

const PomoBoxSpan = styled('span', {
  fontFamily: '$inter',
  fontSize: '1.4rem',
  fontWeight: 500,
  color: '$grey-700',

  marginRight: '1rem',
});

const MenuSvgStyled = styled(MenuSvg, {
  fill: '$grey-800',

  '&:hover': {
    cursor: 'pointer',
  },
});
