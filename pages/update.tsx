import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { styled } from '@styled';

import useSettings from '@state/settings';
import Page from '@layouts/page';
import Button from '@components/button';
import Seperator from '@components/separator';
import useNotes from '@state/notes';

import status from '@utils/statusText';
import { convertDataVersion } from '@utils/versionMigration';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showSaveFilePicker: any;
  }
}

interface CurrentStepState {
  [key: number]: {
    step: number;
    status: 'waiting' | 'processing' | 'success' | 'failed';
  };
}

const Update: React.FC = () => {
  const [currentStepNo, setCurrentStepNo] = useState<CurrentStepState>({
    1: {
      step: 1,
      status: 'waiting',
    },
    2: {
      step: 2,
      status: 'waiting',
    },
    3: {
      step: 3,
      status: 'waiting',
    },
  });

  const router = useRouter();

  const { version, setNewVersion } = useSettings((state) => ({
    version: state.version,
    setNewVersion: state.setNewVersion,
  }));
  const { currentCollection, notesState, migrateNotesState } = useNotes(
    (state) => ({
      currentCollection: state.currentCollection,
      notesState: state.notesState,
      changeCurrentCollection: state.changeCurrentCollection,
      migrateNotesState: state.migrateNotesState,
    })
  );

  const onNewUserContinueClick = () => {
    setNewVersion(process.env.NEXT_PUBLIC_VERSION);
    router.push('/notes');
  };

  const onBackupDataClick = async () => {
    if (!window) return;

    setCurrentStepNo({
      ...currentStepNo,
      1: { step: 1, status: 'processing' },
    });

    const data = {
      version,
      currentCollection,
      notesState,
    };

    const options = {
      suggestedName: `space-backup-${version}`,
      types: [
        {
          description: 'JSON File',
          accept: {
            'application/json': ['.json'],
          },
        },
      ],
    };

    try {
      const handle = await window.showSaveFilePicker(options);
      console.log(handle);

      const writable = await handle.createWritable();
      await writable.write(JSON.stringify(data));
      await writable.close();

      setCurrentStepNo({ ...currentStepNo, 1: { step: 1, status: 'success' } });
    } catch (err) {
      console.log(err);

      setCurrentStepNo({ ...currentStepNo, 1: { step: 1, status: 'failed' } });
    }
  };

  const onConvertDataClick = async () => {
    setCurrentStepNo({
      ...currentStepNo,
      2: { step: 2, status: 'processing' },
    });

    try {
      const {
        notesState: updatedNotesState,
        currentCollection: updatedCurrentCollection,
      } = await convertDataVersion({
        from: 'v0.1.1',
        to: 'v0.1.2',
        data: {
          currentCollection,
          notesState,
        },
      });

      console.log(updatedNotesState);
      migrateNotesState(updatedNotesState, updatedCurrentCollection);
    } catch (err) {
      setCurrentStepNo({ ...currentStepNo, 2: { step: 2, status: 'failed' } });
    }

    setCurrentStepNo({ ...currentStepNo, 2: { step: 2, status: 'success' } });
  };

  const onBackToSpaceClick = () => {
    setCurrentStepNo({
      ...currentStepNo,
      3: { step: 3, status: 'processing' },
    });

    setNewVersion(process.env.NEXT_PUBLIC_VERSION);

    setCurrentStepNo({ ...currentStepNo, 3: { step: 3, status: 'success' } });

    console.log('back to space /');
    router.push('/notes/home');
  };

  useEffect(() => {
    console.log(currentStepNo);
  }, [currentStepNo]);

  return (
    <Page>
      <Container>
        <Heading>
          Upgrade from v{version} to v{process.env.NEXT_PUBLIC_VERSION}
        </Heading>
        <Text>
          If you are a <b>new user</b>, you can read the release notes down
          below and start using Space. <br />
          Welcome to the <b>Space</b> :D
        </Text>
        <Button onClick={onNewUserContinueClick}>Use Space</Button>

        <Seperator />

        <Text>
          But, if you are a <b>old member and have your data stored</b>, you
          need to migrate your data to new version. It will only happens
          sometimes when breaking changes occur, and I will try my best to not
          lose your data and safely migrate it to new version.
        </Text>
        <StepContainer>
          <Text>Step 1 &nbsp; &rarr;</Text>
          <Button onClick={onBackupDataClick}>Backup your data</Button>
          <Text color={currentStepNo[1].status}>
            {status(currentStepNo[1].status)}
          </Text>
        </StepContainer>
        <StepContainer>
          <Text>Step 2 &nbsp; &rarr;</Text>
          <Button
            disabled={currentStepNo[1].status !== 'success'} // Disable when previous step didn't succeeded
            onClick={onConvertDataClick}
          >
            Convert data to new version
          </Button>
          <Text color={currentStepNo[2].status}>
            {status(currentStepNo[2].status)}
          </Text>
        </StepContainer>
        <StepContainer>
          <Text>Step 3 &nbsp; &rarr;</Text>
          <Button
            disabled={currentStepNo[2].status !== 'success'} // Disable when previous step didn't succeeded
            onClick={onBackToSpaceClick}
          >
            Back to Space &nbsp; :D
          </Button>
          <Text color={currentStepNo[3].status}>
            {status(currentStepNo[3].status)}
          </Text>
        </StepContainer>

        <Text>
          If you are somehow not able to migrate your data, or there is error
          occuring during process, please open a
          <a
            href="https://github.com/DenoSaurabh/space/issues/new/choose"
            target="_blank"
            rel="noreferrer"
          >
            issue
          </a>
          or email me at <b>denosaurabh@gmail.com</b>
        </Text>

        <Seperator />
        <br />
        <br />
        <br />
        <br />

        <Heading>Release Notes</Heading>
        <UL>
          <MiniHeading>New Stuff</MiniHeading>
          <LI>
            Now you can double click or touch on board to add a new note,
            (Suggestion from a community member)
          </LI>
          <LI>
            Themes are now get stored in your settings (localStorage) so you
            don&apos;t have to set it every time.
          </LI>
          <LI>
            New Keyboard Shortcuts (keyboard settings still in development)
          </LI>
        </UL>

        <UL>
          <MiniHeading>Changes</MiniHeading>

          <LI>
            Change from unsafe and bug prone `.length` for generating for ids,
            to `nanoid`.
            <a
              href="https://github.com/ai/nanoid/"
              rel="noreferrer"
              target="_blank"
            >
              More About Nanoid
            </a>
          </LI>
          <LI>Fixed theme colors of components like Alert Dialog and Switch</LI>
          <LI>
            Changing Notes Collections are now managed with URL (suggestion from
            <a
              href="https://github.com/Rishabh-Rathod"
              rel="noreferrer"
              target="_blank"
            >
              Rishabh Rathod
            </a>
            over
            <a
              href="https://github.com/DenoSaurabh/space/discussions/4"
              rel="noreferrer"
              target="_blank"
            >
              discussions
            </a>
            )
          </LI>
        </UL>
      </Container>
    </Page>
  );
};

export default Update;

const Container = styled('div', {
  maxWidth: '60%',
  minWidth: '40rem',

  margin: '5rem auto',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',

  gap: '3rem',

  '& a': {
    color: 'inherit',
    fontWeight: 'bold',
    textDecoration: 'underline',

    margin: '0 0.5rem',
  },

  '@tablet': {
    maxWidth: '90%',
    width: '90%',
  },
});

const Heading = styled('h1', {
  fontSize: '4rem',
  fontWeight: '900',
  color: '$grey-800',
});

const Text = styled('p', {
  fontSize: '1.6rem',
  color: '$grey-800',
  lineHeight: '25px',

  variants: {
    color: {
      waiting: {
        color: '$grey-800',
      },
      processing: {
        color: '$yellow',
      },
      success: {
        color: '$green',
      },
      failed: {
        color: '$red',
      },
    },
  },
});

const StepContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',

  gap: '2rem',

  fontWeight: 'bold',
  fontSize: '2rem',
});

const UL = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: '2rem',

  listStyleType: 'unset',
  listStylePosition: 'inside',

  marginBottom: '4rem',

  '@tablet': {
    gap: '2rem',
  },
});

const MiniHeading = styled('h6', {
  fontSize: '1.8rem',
  color: '$grey-800',

  marginBottom: '2rem',
});

const LI = styled('li', {
  fontSize: '1.6rem',
  color: '$grey-700',

  transition: '$fast',

  '&:hover': {
    cursor: 'pointer',
    color: '$grey-800',
  },
});
