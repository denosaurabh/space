import { useState } from 'react';
import Image from 'next/image';

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
import {
  Root,
  Arrow,
  StyledContent,
  TooltipTrigger,
} from '@components/tooltip';
import Input from '@components/input';
import CollectionBox from '@shared/notes/collectionBox';
import useNotes from '@state/notes';

const CreateCollection: React.FC = () => {
  const [name, setName] = useState('');

  const { createCollection } = useNotes((state) => ({
    createCollection: state.createCollection,
  }));

  const onAddedNewCollectionClick = () => {
    createCollection({ name });
  };

  return (
    <AlertDialogRoot>
      <AlertDialogTrigger>
        <Root>
          <TooltipTrigger>
            <CollectionBox css={{ backgroundColor: 'none' }}>
              <Image
                alt="Add Collection"
                src="/icons/Plus.svg"
                width={20}
                height={20}
              />
            </CollectionBox>
          </TooltipTrigger>
          <StyledContent side="left">
            <Arrow />
            New Collection
          </StyledContent>
        </Root>
      </AlertDialogTrigger>
      <AlertDialogStyledOverlay />
      <AlertDialogStyledContent>
        <AlertDialogTitle>Add Collection</AlertDialogTitle>
        <AlertDialogDescription>
          <Input
            label="Name"
            type="name"
            placeHolder="Work Notes"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </AlertDialogDescription>
        <AlertDialogAction onClick={() => onAddedNewCollectionClick()}>
          Create Collection
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogStyledContent>
    </AlertDialogRoot>
  );
};

export default CreateCollection;
