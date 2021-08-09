import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useShortcuts } from 'react-shortcuts-hook';

import { styled } from '@styled';

import CollectionBox from '@shared/notes/collectionBox';

import useNotes from '@state/notes';
import { NotesCollection } from '@lib/store/notes';

const CreateCollection = dynamic(
  () => import('@shared/notes/createCollection'),
  { ssr: false }
);

const NotesCollectionSidebar: React.FC = () => {
  const { notesState, currentCollection, deleteCollection } = useNotes(
    (state) => ({
      notesState: state.notesState,
      currentCollection: state.currentCollection,
      deleteCollection: state.deleteCollection,
    })
  );

  const router = useRouter();

  const changeCurrentCollectionHandler = (id: string) => {
    router.push(`/notes/${id}`);
  };

  const handleDeleteCollection = (slug: string) => {
    // Default Collection shouldn't be deleted
    if (slug === 'home') return;

    console.log('deleting collection', slug);

    deleteCollection(slug);
    router.push('/notes/home');
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
        const firstString = el.name[0].toUpperCase();

        const isCurrentCollection = el.slug === router?.query?.id;

        return (
          <CollectionBox
            key={i}
            name={el.name}
            slug={el.slug}
            icon={el.icon}
            firstString={firstString}
            isCurrentCollection={isCurrentCollection}
            onClickHandler={() => {
              console.log(el.slug);
              changeCurrentCollectionHandler(el.slug);
            }}
            handleDeleteCollection={handleDeleteCollection}
          />
        );
      })}

      <CreateCollection />
    </NotesCollectionContainer>
  );
};

export default NotesCollectionSidebar;

const NotesCollectionContainer = styled('div', {
  height: '100%',
  backgroundColor: '$grey-100',

  padding: '2rem 1.6rem',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});
