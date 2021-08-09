import { useState } from 'react';

import { styled } from '@styled';
import Input from '@components/input';

import ImportSvg from '@assets/svg/Import.svg';

interface DropIconI {
  onError: ({ message }) => void;
  onUpload: (icon: File) => void;
}

const DropIcon: React.FC<DropIconI> = ({ onError, onUpload }) => {
  const [uploadedIconURL, setUploadIconURL] = useState(null);

  const onIconUpload = (e) => {
    const files = e.target.files;

    if (!files) return;

    const icon = files[0];
    const { size } = icon;

    console.log(icon);

    if (size > 1000000) {
      // Over 1MB
      console.log('over size');
      // return;

      onError({ message: 'Icon size is too big' });
    }

    onUpload(icon);

    const iconUrl = URL.createObjectURL(icon);
    setUploadIconURL(iconUrl);
  };

  return (
    <DropContainer>
      <p>Icon</p>
      <Input
        label={
          uploadedIconURL ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={uploadedIconURL}
              width={20}
              height={20}
              alt="Upload Icon"
            />
          ) : (
            <ImportSvg />
          )
        }
        type="file"
        accept="image/*"
        placeholder="Drop Icon"
        size="mini"
        onChange={onIconUpload}
      />
    </DropContainer>
  );
};

export default DropIcon;

const DropContainer = styled('div', {
  p: {
    fontFamily: '$inter',
    fontSize: '1.4rem',
    marginBottom: '0.6rem',
    color: '$grey-700',
  },

  div: {
    padding: '0.8rem 1rem ',

    border: '1px solid $grey-400',
    borderRadius: '0.8rem',

    label: {
      margin: 0,
    },

    input: {
      display: 'none',
    },
  },
});
