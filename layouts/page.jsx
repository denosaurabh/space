import Header from '@components/header';
import { styled } from '@styled'

const Container = styled('div', {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
})

const Box = styled('main', {
    width: '100%',
    height: '100%',
})

const Page = ({ children }) => {
    return (
        <Container>
          <Header />

          <Box>
            {children}
          </Box>
        </Container>
    )
}

export default Page;