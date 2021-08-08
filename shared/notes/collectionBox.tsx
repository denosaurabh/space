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

import Input from '@components/input';
import DropIcon from '@components/dropIcon';
// import Seperator from '@components/separator';

interface CollectionBoxProps {
  slug?: string;
  name?: string;
  firstString?: string;
  isCurrentCollection?: boolean;
  onClickHandler?: () => void;
  handleDeleteCollection?: (id: string) => void;
}

const CollectionBox: React.FC<CollectionBoxProps> = ({
  name,
  slug,
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

  useEffect(() => {
    if (!window || !showContextMenu) return;

    const onDocumentClick = (e) => {
      const collectionPopover = document.querySelector(
        '.collectionbox-popover-content'
      );

      if (collectionPopover && !collectionPopover.contains(e.target)) {
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
              {firstString || children}
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
          <DropIcon />
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

        <LI onClick={onDeleteCollectionClick}>
          <TrashSvg />
          Delete Collection
        </LI>
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
