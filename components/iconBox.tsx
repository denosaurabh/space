import Link from 'next/link';
import { Root, Trigger, Content, Arrow } from '@radix-ui/react-tooltip';

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

const TooltipTrigger = styled(Trigger, {
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
});

const StyledContent = styled(Content, {
  padding: '1rem',
  backgroundColor: '#000',
  fontFamily: '$system',
  color: '#fff',
});

const IconBox: React.FC<IconBoxI> = ({ icon, href }) => {
  return (
    <Root>
      <TooltipTrigger>
        <Link href={href} passHref>
          <Icon>{icon}</Icon>
        </Link>
      </TooltipTrigger>
      <StyledContent>
        Home
        <Arrow />
      </StyledContent>
    </Root>
  );
};

export default IconBox;
