import { useState, useEffect } from 'react';
import { styled, darkTheme } from '@styled';

import TrashSvg from '@assets/svg/Trash.svg';
import CloseSvg from '@assets/svg/Close.svg';

import {
  Root,
  Arrow,
  StyledContent,
  TooltipTrigger,
} from '@components/tooltip';

import {
  Root as PopoverRoot,
  StyledTrigger as PopoverTrigger,
  Anchor as PopoverAnchor,
  StyledContent as PopoverContent,
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

import Input from '@components/input';
import DropIcon from '@components/dropIcon';
import Badge from '@components/badge';

interface CollectionBoxProps {
  slug?: string;
  name?: string;
  icon?: string;
  firstString?: string;
  isCurrentCollection?: boolean;
  onClickHandler?: () => void;
  handleDeleteCollection?: (id: string) => void;
}

const CollectionBox: React.FC<CollectionBoxProps> = ({
  name,
  slug,
  icon,
  firstString,
  isCurrentCollection,
  onClickHandler,
  handleDeleteCollection,
  children,
}) => {
  const [showContextMenu, setShowContextMenu] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();

    // Hack to disabling Context Menu on Home Collection and Create New Collection Button
    if (name === 'Home' || name === 'New Collection') return;

    setShowContextMenu(true);
    return false;
  };

  const onCloseClick = (e) => {
    e.preventDefault();

    setShowContextMenu(false);
  };

  const onDeleteCollectionClick = () => {
    handleDeleteCollection(slug);

    setShowContextMenu(false);
  };

  const onCollectionNameChange = (e) => {
    const { value } = e.target;
    console.log(value);
  };

  const onIconUploadSuccess = (icon: File) => {
    console.log('icon uploaded', icon);
    // addNotesCollectionIcon(icon);

    // const { src } = collectionIcons[icon.name];
    // updateCollectionIcon(slug, src);
  };

  const onIconUploadError = ({ message }) => {
    console.log(message);
  };

  useEffect(() => {
    if (!window || !showContextMenu) return;

    const onDocumentClick = (e) => {
      const collectionPopover = document.querySelector(
        '.collectionbox-popover-content'
      );

      const collectionAlertDialog = document.querySelector(
        '.collection-box-alert-dialog'
      );

      if (
        collectionPopover &&
        !collectionPopover.contains(e.target) &&
        collectionAlertDialog &&
        !collectionAlertDialog.contains(e.target)
      ) {
        setShowContextMenu(false);
      }
    };

    window.document.addEventListener('click', onDocumentClick, true);
    window.document.addEventListener('contextmenu', onDocumentClick, true);

    return () => {
      window.document.removeEventListener('click', onDocumentClick);
      window.document.removeEventListener('contextmenu', onDocumentClick);
    };
  }, [showContextMenu]);

  return (
    <PopoverRoot open={showContextMenu}>
      <PopoverTrigger>
        <Root delayDuration={300}>
          <TooltipTrigger>
            <CollectionBoxStyled
              onContextMenu={handleContextMenu}
              onClick={onClickHandler}
              css={{
                backgroundColor: isCurrentCollection
                  ? '$grey-300'
                  : '$grey-200',
              }}
            >
              {!icon ? (
                firstString || children
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`${icon}`} alt="Collection Icon" />
              )}
            </CollectionBoxStyled>
          </TooltipTrigger>

          <StyledContent side="left">
            <Arrow />
            {name}
          </StyledContent>
        </Root>
      </PopoverTrigger>
      <PopoverAnchor />
      <PopoverContent
        className="collectionbox-popover-content"
        color="light"
        dropShadow
        css={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '1.3rem',
          gap: '1rem',
          width: '25rem',
        }}
        side="left"
        sideOffset={40}
      >
        <Title>
          Collection Menu
          <LI css={{ width: 'fit-content' }} onClick={onCloseClick}>
            <CloseSvg />
          </LI>
        </Title>

        <InputBox>
          <DropIcon
            onError={onIconUploadError}
            onUpload={onIconUploadSuccess}
          />
          <Input
            label="Name"
            type="name"
            value={name}
            placeholder={`Name of Collection`}
            size="mini"
            css={{ width: '80%', input: { borderColor: '$grey-400' } }}
            onChange={onCollectionNameChange}
          />
        </InputBox>
        <Badge size="medium" css={{ margin: 0 }}>
          Icon and Change Name soon
        </Badge>

        <AlertDialogRoot>
          <AlertDialogTrigger css={{ width: '100%' }}>
            <LI>
              <TrashSvg />
              Delete Collection
            </LI>
          </AlertDialogTrigger>
          <AlertDialogStyledOverlay />
          <AlertDialogStyledContent
            className="collection-box-alert-dialog"
            css={{ width: '60rem' }}
          >
            <AlertDialogTitle>
              Are you sure to delete &quot;{name}&quot; Collection
            </AlertDialogTitle>
            <AlertDialogDescription>
              The action is NOT reversible
            </AlertDialogDescription>

            <AlertDialogAction
              disabled={name.length === 0}
              onClick={onDeleteCollectionClick}
            >
              Delete Collection
            </AlertDialogAction>
            <AlertDialogCancel onClick={() => setShowContextMenu(false)}>
              Cancel
            </AlertDialogCancel>
          </AlertDialogStyledContent>
        </AlertDialogRoot>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default CollectionBox;

const CollectionBoxStyled = styled('div', {
  size: '5rem',
  borderRadius: '1rem',
  backgroundColor: '$grey-200',

  display: 'grid',
  placeItems: 'center',

  fontFamily: '$system',
  fontSize: '2rem',
  color: '$grey-800',

  transition: '$medium',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-300',
  },
});

const Title = styled('h6', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  fontSize: '1.6rem',
  fontWeight: '600',
  color: '$grey-700',

  padding: '1rem',
  paddingTop: '0rem',
});

const LI = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  width: '100%',
  padding: '1rem',
  paddingLeft: '1.2rem',

  border: '1px solid $grey-300',
  borderRadius: '0.8rem',

  fontSize: '1.4rem',
  fontWeight: '500',
  color: '$grey-700',
  backgroundColor: '$grey-100',

  transition: '$medium',

  svg: {
    width: '20',

    fill: '$grey-600',
  },

  '&:hover': {
    cursor: 'pointer',
    color: '$grey-800',
    backgroundColor: '$grey-200',

    svg: {
      fill: '$grey-800',
    },

    [`.${darkTheme} &`]: {
      backgroundColor: '$grey-200',
      color: '$grey-700',

      svg: {
        fill: '$grey-700',
      },
    },
  },
});

const InputBox = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
});
