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
  padding: '1rem 1.5rem',
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

const Settings = styled(Image, {
  transition: '$medium',
  '&:hover': {
    cursor: 'pointer',
    transform: 'rotate(40deg)',
  },
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
        name="Notes"
        icon={
          <Image
            src="/icons/Reader.svg"
            alt="All Notes"
            width={22}
            height={22}
          />
        }
        href="/"
      />
      <IconBox
        name="Todo"
        icon={
          <Image src="/icons/Todo.svg" alt="All Notes" width={20} height={20} />
        }
        href="/todo"
        soon
      />
      <IconBox
        name="Calender"
        icon={
          <Image
            src="/icons/Calender.svg"
            alt="All Notes"
            width={20}
            height={20}
          />
        }
        href="/"
        soon
      />
      <IconBox
        name="Pomodoro"
        icon={
          <Image
            src="/icons/Timer.svg"
            alt="All Notes"
            width={20}
            height={20}
          />
        }
        href="/todo"
        soon
      />
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
    <Link href="/settings" passHref>
      <Settings src="/icons/Gear.svg" alt="Settings" width={25} height={25} />
    </Link>
  </HeaderStyled>
);

export default Header;
