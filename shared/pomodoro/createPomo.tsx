import { useState } from 'react';
import { styled } from '@styled';

import Input from '@components/input';
import Button from '@components/button';

import CloseSvg from '@assets/svg/Close.svg';

import usePomodoro from '@state/pomodoro';

const CreatePomo: React.FC = () => {
  const { showCreatePomo, setShowCreatePomo, createPomo } = usePomodoro(
    (state) => state
  );

  const [title, setTitle] = useState('');
  const [noOfPomos, setNoOfPomos] = useState(1);

  const handleNewPomoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createPomo({ title, noOfPomos });

    setTitle('');
    setNoOfPomos(0);

    setShowCreatePomo(false);
  };

  if (!showCreatePomo) return null;

  return (
    <NewPomoBox>
      <CancelSpan onClick={() => setShowCreatePomo(false)}>
        <CloseSvg />
        Cancel
      </CancelSpan>

      <NewPomoForm onSubmit={handleNewPomoSubmit}>
        <Input
          type="name"
          placeholder="adding a feature"
          required
          label="Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="number"
          placeholder="4"
          label="Est. Pomos"
          min="1"
          value={noOfPomos}
          onChange={(e) => {
            setNoOfPomos(e.target.value);
          }}
          required
        />

        <Button>Add Pomodoro</Button>
      </NewPomoForm>
    </NewPomoBox>
  );
};

export default CreatePomo;

const NewPomoBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  '@tablet': {
    maxWidth: '50rem',
    width: '90%',

    marginBottom: '5rem',
  },

  gap: '3rem',
});

const NewPomoForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',

  gap: '3rem',
});

const CancelSpan = styled('span', {
  alignSelf: 'flex-start',

  fontFamily: '$inter',
  fontSize: '1.6rem',
  color: '$grey-700',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',

  marginBottom: '2rem',

  svg: {
    fill: '$grey-600',
  },

  transition: '$fast',

  '&:hover': {
    fontWeight: 500,
    cursor: 'pointer',
  },
});
