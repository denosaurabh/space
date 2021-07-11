import Image from 'next/image';
import { styled } from '@styled';
import IconBox from '@components/iconBox';
import Badge from './badge';
import Link from 'next/link';

const HeaderStyled = styled('header', {
  width: '100%',
  height: '$header',
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  padding: '1rem',
  borderBottom: '1px solid $headerBorderBottom',
});

const HeaderNav = styled('div', {
  flexRow: '',
  gap: '1.2rem',
  marginRight: 'auto',
});

const HeaderLogo = styled(Image, {
  marginRight: '2rem',
});

const Header: React.FC = () => (
  <HeaderStyled>
    <HeaderLogo
      className="header-logo"
      src="/space.png"
      alt="Space - Productivity & Management Tool"
      width={22}
      height={22}
    />

    <HeaderNav>
      <IconBox
        icon={
          <Image
            src="/icons/Reader.svg"
            alt="All Notes"
            width={18}
            height={18}
          />
        }
        href="/"
      />
      <IconBox icon={'A'} href="/todo" />
      <IconBox icon={'G'} href="/" />
      <IconBox icon={'S'} href="/todo" />
    </HeaderNav>

    <Link href="https://github.com/DenoSaurabh/space">
      <a target="_blank">
        <Badge>
          Early Development (Alpha)
          <Image
            className="badge-icon"
            src="/icons/External-Link.svg"
            alt="External Link"
            width={15}
            height={15}
          />
        </Badge>
      </a>
    </Link>
  </HeaderStyled>
);

export default Header;
