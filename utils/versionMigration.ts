// probably some confusion in the file, but tbh I don't even know how it will gonna work, but I know it will work just fine
import { nanoid } from 'nanoid';

import { NotesCollection } from '@lib/store/notes';
import slugify from '@utils/slug';

type versions = 'v0.1.1' | 'v0.1.2';

interface Note01 {
  id: string;
  text: string;
  size: { width: number; height: number };
  position: { x: number; y: number };
}

const convertNoteFrom011To012 = (note: Note01) => {
  const { text, size, position } = note;
  const id = nanoid();

  return {
    id,
    text,
    size,
    position,
  };
};

const convertCollectionFrom011To012 = (
  collection: NotesCollection
): NotesCollection => {
  const { name, notes } = collection;
  const collectionId = nanoid();

  const slug = slugify(name);

  const notesArr = Object.values(notes);
  const newNotes = {};

  notesArr.forEach((note) => {
    const newNote = convertNoteFrom011To012(note);
    newNotes[newNote.id] = newNote;
  });

  return {
    id: collectionId,
    slug,
    name,
    icon: '',
    notes: newNotes,
  };
};

interface ConvertDataVersionI {
  from: versions;
  to: versions;
  data: {
    currentCollection: string;
    notesState: { [key: string]: NotesCollection };
  };
}

interface NewNoteStateI {
  notesState: { [key: string]: NotesCollection };
  currentCollection: string;
}

const convertDataVersion = ({
  from,
  to,
  data,
}: ConvertDataVersionI): Promise<NewNoteStateI> => {
  console.log(`Converting data from ${from} to ${to}....`);

  const promise = new Promise<NewNoteStateI>((resolve, reject) => {
    try {
      const collectionDataArray = Object.values(data.notesState);

      const newCollection = {};
      collectionDataArray.forEach((collectionData) => {
        const updatedCollection = convertCollectionFrom011To012(collectionData);
        newCollection[updatedCollection.slug] = updatedCollection;
      });

      resolve({
        currentCollection: 'home',
        notesState: newCollection,
      });
    } catch (err) {
      reject(err);
    }
  });

  return promise;
};

export { convertDataVersion };
