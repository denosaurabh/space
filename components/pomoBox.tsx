import { styled } from '@styled';

import {
  Root as PopoverRoot,
  StyledTrigger as PopoverTrigger,
  Anchor as PopoverAnchor,
  StyledContent as PopoverContent,
  StyledButton as PopoverButton,
} from '@components/popover';

import {
  Root as AlertDialogRoot,
  Trigger as AlertDialogTrigger,
  StyledOverlay as AlertDialogStyledOverlay,
  StyledContent as AlertDialogStyledContent,
  StyledTitle as AlertDialogTitle,
  StyledCancel as AlertDialogCancel,
  StyledAction as AlertDialogAction,
  StyledDescription as AlertDialogDescription,
} from '@components/alertDialog';

import MenuSvg from '@assets/svg/Menu.svg';
import DeleteSvg from '@assets/svg/Trash.svg';
import usePomodoro from '@state/pomodoro';

interface PomoBoxProps {
  id: string;
  heading: string;
  span: string;
  hideMenu?: boolean;
}

const PomoBox: React.FC<PomoBoxProps> = ({
  id,
  heading,
  span,
  hideMenu = false,
}) => {
  const { deletePomo, switchPomoUp, switchPomoDown } = usePomodoro((state) => ({
    deletePomo: state.deletePomo,
    switchPomoUp: state.switchPomoUp,
    switchPomoDown: state.switchPomoDown,
  }));

  const handlePomoSwitchUp = () => {
    switchPomoUp(id);
  };

  const handlePomoSwitchDown = () => {
    switchPomoDown(id);
  };

  const onDeleteConfirmClick = () => {
    deletePomo(id);
  };

  return (
    <PomoBoxStyled>
      <PomoBoxHeading>{heading}</PomoBoxHeading>
      <PomoBoxSpan>{span}</PomoBoxSpan>
      {!hideMenu && (
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
            <PopoverButton onClick={handlePomoSwitchUp}>
              &uarr; Switch Up
            </PopoverButton>
            <PopoverButton onClick={handlePomoSwitchDown}>
              &darr; Switch Down
            </PopoverButton>

            <AlertDialogRoot>
              <AlertDialogTrigger css={{ width: '90%', marginRight: '0' }}>
                <PopoverButton css={{ width: '100%', marginRight: '0' }}>
                  <DeleteSvg width={15} height={15} />
                  Delete
                </PopoverButton>
              </AlertDialogTrigger>
              <AlertDialogStyledOverlay />
              <AlertDialogStyledContent
                className="pomodoro-box-alert-dialog"
                css={{ width: '60rem' }}
              >
                <AlertDialogTitle>
                  Are you sure to delete &quot;{heading}&quot; Pomodoro
                </AlertDialogTitle>
                <AlertDialogDescription>
                  The action is NOT reversible
                </AlertDialogDescription>

                <AlertDialogAction onClick={onDeleteConfirmClick}>
                  Delete Pomodoro
                </AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogStyledContent>
            </AlertDialogRoot>
          </PopoverContent>
        </PopoverRoot>
      )}
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

  '@mobile': {
    padding: '2.8rem',
  },

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
