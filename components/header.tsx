import Image from 'next/image';
import Link from 'next/link';

import { styled } from '@styled';
import IconBox from '@components/iconBox';
import Badge from '@components/badge';

import ReaderSvg from '@assets/svg/Reader.svg';
import PencilSvg from '@assets/svg/Pencil.svg';
import SettingSvg from '@assets/svg/Setting.svg';
import TimerSvg from '@assets/svg/Timer.svg';
import Calendarvg from '@assets/svg/Calendar.svg';
import ThemeButton from './themeButton';

const HeaderStyled = styled('header', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  padding: '1.4rem 1.5rem',
  borderBottom: '1px solid $grey-400',

  backgroundColor: '$grey-100',
});

const HeaderNav = styled('div', {
  flexRow: '',
  gap: '1.6rem',
  marginRight: 'auto',
});

const HeaderLogo = styled(Image, {
  marginRight: '2rem',
});

const SettingsStyledSvg = styled(SettingSvg, {
  width: 25,
  height: 25,
  fill: '$grey-700',

  transition: '$medium',

  '&:hover': {
    cursor: 'pointer',
    transform: 'rotate(40deg)',
  },
});

const Header: React.FC = () => {
  return (
    <HeaderStyled>
      <Link href="/" passHref>
        <a>
          <HeaderLogo
            className="header-logo"
            src="/space.png"
            alt="Space - Productivity & Management Tool"
            width={26}
            height={26}
          />
        </a>
      </Link>

      <HeaderNav>
        <IconBox name="Notes" icon={<ReaderSvg />} href="/notes" />
        <IconBox name="Todo" icon={<PencilSvg />} href="/todo" soon />
        <IconBox name="Calender" icon={<Calendarvg />} href="/calendar" soon />
        <IconBox name="Pomodoro" icon={<TimerSvg />} href="/pomodoro" soon />
      </HeaderNav>

      <ThemeButton />

      <Badge
        css={{
          '& a': {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            color: 'inherit',
          },

          '@tablet': {
            display: 'none',
          },
        }}
      >
        <Link href="https://github.com/DenoSaurabh/space">
          <a target="_blank" rel="noreferrer">
            Release v0.1
            <Image
              className="badge-icon"
              src="/icons/External-Link.svg"
              alt="External Link"
              width={18}
              height={18}
            />
          </a>
        </Link>
      </Badge>

      <Link href="/settings" passHref>
        <a>
          <SettingsStyledSvg />
        </a>
      </Link>
    </HeaderStyled>
  );
};

export default Header;
