import dynamic from 'next/dynamic';
import { styled } from '@styled';

import {
  Root,
  Arrow,
  StyledContent,
  TooltipTrigger,
} from '@components/tooltip';

import {
  Root as ContextMenuRoot,
  Trigger as ContextMenuTrigger,
  StyledItem as ContextMenuItem,
  StyledContent as ContextMenuContent,
} from '@components/contextMenu';

import CollectionBox from '@shared/notes/collectionBox';
// import CreateCollection from '@shared/notes/createCollection';

const CreateCollection = dynamic(
  () => import('@shared/notes/createCollection'),
  { ssr: false }
);

import useNotes from '@state/notes';
import React from 'react';

const NotesCollectionContainer = styled('div', {
  width: '5rem',
  height: '100%',
  backgroundColor: '$grey-100',

  padding: '1rem 0',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.4rem',
});

const NotesCollection: React.FC = () => {
  const { currentCollection, changeCurrentCollection, notesState } = useNotes(
    (state) => ({
      currentCollection: state.currentCollection,
      changeCurrentCollection: state.changeCurrentCollection,
      notesState: state.notesState,
    })
  );

  const changeCurrentCollectionHandler = (id) => {
    changeCurrentCollection(id);
  };

  return (
    <NotesCollectionContainer>
      {Object.values(notesState).map((el, i) => {
        const firstString = el.name[0];

        const isCurrentCollection = el.id == currentCollection;

        return (
          <ContextMenuRoot key={i}>
            <ContextMenuTrigger>
              <Root key={i}>
                <TooltipTrigger>
                  <CollectionBox
                    onClick={() => changeCurrentCollectionHandler(el.id)}
                    css={{
                      backgroundColor: isCurrentCollection
                        ? '$grey-300'
                        : '$grey-200',
                    }}
                  >
                    {firstString.toUpperCase()}
                  </CollectionBox>
                </TooltipTrigger>

                <StyledContent side="left">
                  <Arrow />
                  {el.name}
                </StyledContent>
              </Root>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Change Name</ContextMenuItem>
              <ContextMenuItem>Set to Default</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenuRoot>
        );
      })}

      <CreateCollection />
    </NotesCollectionContainer>
  );
};

export default NotesCollection;
