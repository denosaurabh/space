import { ChangeEvent, useState } from 'react';
import { styled } from '@styled';

import {
  Root as AlertDialogRoot,
  Trigger as AlertDialogTrigger,
  StyledOverlay as AlertDialogStyledOverlay,
  StyledContent as AlertDialogStyledContent,
  StyledTitle as AlertDialogTitle,
  StyledDescription as AlertDialogDescription,
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
  }));

  const onAddedNewCollectionClick = () => {
    if (name.length === 0) return;

    createCollection({ name });
  };

  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <CollectionBox>
          <PlusStyledSvg />
        </CollectionBox>
      </AlertDialogTrigger>
      <AlertDialogStyledOverlay />
      <AlertDialogStyledContent>
        <AlertDialogTitle>Add Collection</AlertDialogTitle>
        <AlertDialogDescription>
          <Input
            label="Name"
            type="name"
            placeholder="Work Notes"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            required
          />
        </AlertDialogDescription>
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
