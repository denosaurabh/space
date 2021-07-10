import Link from 'next/link';
import { styled } from '@styled';
import { IconBoxI } from '@lib/components/iconBox';

const Icon = styled('div', {
  width: '3rem',
  height: '3rem',
  backgroundColor: '$icon',
  borderRadius: '$small',
  display: 'grid',
  placeItems: 'center',
  fontSize: '1.4rem',
  transition: 'background-color $medium',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$iconHover',
  },
});

const IconBox: React.FC<IconBoxI> = ({ icon, href }) => {
  return (
    <Link href={href} passHref>
      <Icon>{icon}</Icon>
    </Link>
  );
};

export default IconBox;
