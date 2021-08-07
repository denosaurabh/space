import { ChangeEvent, useState } from 'react';
import { styled } from '@styled';

import {
  Root as AlertDialogRoot,
  Trigger as AlertDialogTrigger,
  StyledOverlay as AlertDialogStyledOverlay,
  StyledContent as AlertDialogStyledContent,
  StyledTitle as AlertDialogTitle,
  StyledCancel as AlertDialogCancel,
  StyledAction as AlertDialogAction,
} from '@components/alertDialog';

import PlusSvg from '@assets/svg/Plus.svg';

import Input from '@components/input';
import CollectionBox from '@shared/notes/collectionBox';
import useNotes from '@state/notes';

const PlusStyledSvg = styled(PlusSvg, {
  fill: '$grey-700',
});

const CreateCollection: React.FC = () => {
  const [name, setName] = useState('');

  const { createCollection } = useNotes((state) => ({
    createCollection: state.createCollection,
    notesState: state.notesState,
  }));

  const onAddedNewCollectionClick = () => {
    if (name.length === 0) return;

    createCollection({ name });

    setName('');
  };

  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <CollectionBox name="New Collection">
          <PlusStyledSvg />
        </CollectionBox>
      </AlertDialogTrigger>
      <AlertDialogStyledOverlay />
      <AlertDialogStyledContent>
        <AlertDialogTitle>Add Collection</AlertDialogTitle>
        <Input
          label="Name"
          type="name"
          placeholder="Work Notes"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          css={{ marginBottom: '4rem' }}
          required
        />

        <AlertDialogAction
          onClick={() => onAddedNewCollectionClick()}
          disabled={name.length === 0}
        >
          Create Collection
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogStyledContent>
    </AlertDialogRoot>
  );
};

export default CreateCollection;
