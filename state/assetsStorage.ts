import create from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import produce from 'immer';
import { get, set } from 'idb-keyval';
import { AssetsStorageState } from '@lib/store/assetsStorage';
import useNotes from './notes';

const indexStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    console.log(name, 'has been retrieved');
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, 'with value', value, 'has been saved');
    set(name, value);
  },
};

const useAssetsStorage = create<AssetsStorageState>(
  persist(
    (set, get) => ({
      notesCollection: { icons: {} },
      addNotesCollectionIcon: (notesCollectionSlug, icon) => {
        set(
          produce((draft) => {
            console.log(icon);

            draft.notesCollection.icons[notesCollectionSlug] = {
              file: icon,
            };
          })
        );

        get().readAndSetIconURL(notesCollectionSlug);
      },
      readAndSetIconURL: (notesCollectionSlug) => {
        const iconObj = get().notesCollection.icons[notesCollectionSlug];
        console.log(iconObj, 'reading icon');

        if (iconObj) {
          const iconURL = (window.URL ? URL : webkitURL).createObjectURL(
            iconObj.file
          );

          console.log(iconURL, 'url of icon');

          set(
            produce((draft) => {
              draft.notesCollection.icons[notesCollectionSlug].src = iconURL;
            })
          );

          get().setURLtoNotesCollection(notesCollectionSlug);
          // URL.revokeObjectURL(iconURL);
          return iconURL;
        }
      },
      setURLtoNotesCollection: (id) => {
        const { src } = get().notesCollection.icons[id];
        useNotes.getState().updateCollectionIcon(id, src);
      },
    }),
    {
      name: 'assetsStorage',
      getStorage: () => indexStorage,
    }
  )
);

// useAssetsStorage.subscribe(
//   (state) => {
//     console.log(state, 'assetStorageState sub');
//     if (!state.icons) {
//       return;
//     }

//     const { icons } = state;

//     if (icons) {
//       Object.keys(icons).forEach((key) => {
//         const icon = icons[key];

//         if (icon.file) {
//           useAssetsStorage.getState().readAndSetIconURL(key, icon);
//           console.log(key, 'revoking icon url');
//         }
//       });
//     }
//   },
//   (state) => state.notesCollection
// );

export default useAssetsStorage;
