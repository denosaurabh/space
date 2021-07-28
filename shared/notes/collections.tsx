import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useShortcuts } from 'react-shortcuts-hook';

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

import useNotes from '@state/notes';
import { NotesCollection } from '@lib/store/notes';

const CreateCollection = dynamic(
  () => import('@shared/notes/createCollection'),
  { ssr: false }
);

const NotesCollectionContainer = styled('div', {
  height: '100%',
  backgroundColor: '$grey-100',

  padding: '2rem 1.6rem',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.4rem',
});

const NotesCollectionSidebar: React.FC = () => {
  const { notesState, currentCollection } = useNotes((state) => ({
    notesState: state.notesState,
    currentCollection: state.currentCollection,
  }));

  const router = useRouter();

  const changeCurrentCollectionHandler = (id: string) => {
    router.push(`/notes/${id}`);
  };

  useShortcuts(
    ['ArrowUp'],
    () => {
      console.log('up', currentCollection);

      const collectionsArr = Object.keys(notesState);
      const currentCollectionIndex = collectionsArr.indexOf(currentCollection);

      const previousNo = currentCollectionIndex - 1;

      const previousCollection = collectionsArr[previousNo];
      console.log(previousNo);

      if (previousNo >= 0) {
        router.push(`/notes/${previousCollection}`);
      }
    },
    [currentCollection]
  );

  useShortcuts(
    ['ArrowDown'],
    () => {
      console.log('down!', currentCollection);

      const collectionsArr = Object.keys(notesState);
      const currentCollectionIndex = collectionsArr.indexOf(currentCollection);

      const nextCollection = collectionsArr[currentCollectionIndex + 1];
      console.log(currentCollectionIndex + 1);

      if (nextCollection) {
        router.push(`/notes/${nextCollection}`);
      }
    },
    [currentCollection]
  );

  return (
    <NotesCollectionContainer>
      {Object.values(notesState).map((el: NotesCollection, i) => {
        const firstString = el.name[0];

        const isCurrentCollection = el.slug === router?.query?.id;

        return (
          <ContextMenuRoot key={i}>
            <ContextMenuTrigger>
              <Root key={i} delayDuration={300}>
                <TooltipTrigger>
                  <CollectionBox
                    onClick={() => {
                      console.log(el.slug);
                      changeCurrentCollectionHandler(el.slug);
                    }}
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

export default NotesCollectionSidebar;
