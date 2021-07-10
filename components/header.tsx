import Image from 'next/image';
import { styled } from '@styled';
import IconBox from '@components/iconBox';

const HeaderStyled = styled('header', {
  width: '100%',
  height: '$header',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1rem',
  borderBottom: '1px solid $headerBorderBottom',
});

const Heading = styled('h4', {
  fontFamily: '$system',
  color: '$grey',
  fontSize: '1.2rem',
  marginLeft: 'auto',
});

const Header: React.FC = () => (
  <HeaderStyled>
    <IconBox
      icon={
        <Image src="/icons/Reader.svg" alt="All Notes" width={18} height={18} />
      }
      href="/"
    />
    <IconBox icon={'A'} href="/todo" />
    <IconBox icon={'G'} href="/" />
    <IconBox icon={'S'} href="/todo" />

    <Heading>
      Currently in development https://github.com/denosaurabh/space
    </Heading>
  </HeaderStyled>
);

export default Header;
