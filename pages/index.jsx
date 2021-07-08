import Page from '@container';
import NoteBox from '@components/noteBox';
import { styled } from '@styled';

const AllNotesContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%'
})

const Home = () => {
  return (
    <Page>
      <AllNotesContainer>
        <NoteBox />
      </AllNotesContainer>
    </Page>
  )
}

export default Home;