import { useState } from 'react';
import { styled, darkTheme } from '@styled';

import TrashSvg from '@assets/svg/Trash.svg';

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

    setShowContextMenu(true);
    return false;
  };

  const onContextMenuChange = (open: boolean) => {
    console.log('context menu is', open);
  };

  return (
    <PopoverRoot open={showContextMenu} onOpenChange={onContextMenuChange}>
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
        color="light"
        dropShadow
        css={{
          flexDirection: 'column',
          padding: '1.3rem',
          gap: '1rem',
          width: '25rem',
        }}
        side="left"
        sideOffset={40}
      >
        <Title>Collection Menu</Title>
        <Input type="name" placeholder={`Name of Collection`} size="mini" />
        <LI onClick={() => handleDeleteCollection(slug)}>
          <TrashSvg />
          Delete Collection
        </LI>
        <LI onClick={() => handleDeleteCollection(slug)}>
          <TrashSvg />
          Delete Collection
        </LI>
        <LI css={{ marginTop: '1.4rem', backgroundColor: '$grey-200' }}>OK</LI>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default CollectionBox;

const Title = styled('h6', {
  fontSize: '1.6rem',
  fontWeight: '600',
  color: '$grey-700',
});

const LI = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',

  width: '100%',
  padding: '1rem',
  paddingLeft: '1.2rem',

  borderRadius: '0.8rem',

  fontSize: '1.4rem',
  fontWeight: '500',
  color: '$grey-700',
  backgroundColor: '$grey-100',

  transition: '$fast',

  svg: {
    width: '20',

    fill: '$grey-600',
  },

  '&:hover': {
    cursor: 'pointer',
    color: '$grey-800',
    fontWeight: '600',

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
