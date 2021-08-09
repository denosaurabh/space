import create from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import produce from 'immer';
import { get, set } from 'idb-keyval';
import { AssetsStorageState } from '@lib/store/assetsStorage';

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
    (set) => ({
      notesCollection: { icons: {} },
      addNotesCollectionIcon: (icon) =>
        set(
          produce((draft) => {
            const iconBlobUrl = URL.createObjectURL(icon);

            console.log('iconBlobUrl', iconBlobUrl);

            const iconURL = iconBlobUrl.replace('blob:', '');
            console.log('iconURL', iconURL);

            draft.notesCollection.icons[icon.name] = {
              ...icon,
              src: iconURL,
            };
          })
        ),
    }),
    {
      name: 'assetsStorage',
      getStorage: () => indexStorage,
    }
  )
);

export default useAssetsStorage;
