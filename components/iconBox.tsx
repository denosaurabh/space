import Link from 'next/link';
import {
  Root,
  TooltipTrigger,
  StyledContent,
  Arrow,
} from '@components/tooltip';

import { styled } from '@styled';

import { IconBoxI } from '@lib/components/iconBox';

const Icon = styled('div', {
  width: '5.2rem',
  height: '5.2rem',
  backgroundColor: '$grey-200',
  borderRadius: '$small',
  display: 'grid',
  placeItems: 'center',
  fontSize: '1.4rem',
  transition: 'background-color $medium',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '$grey-300',
  },
  variants: {
    active: {
      false: {
        backgroundColor: 'transparent',
        opacity: 0.4,
      },
    },
  },

  '& svg': {
    width: 20,
    height: 20,

    fill: '$grey-900',
  },
});

const IconBox: React.FC<IconBoxI> = ({ name, icon, href, soon, active }) => {
  return (
    <Root delayDuration={300}>
      <TooltipTrigger>
        <Link href={soon ? '/soon' : href}>
          <a>
            <Icon active={active}>{icon}</Icon>
          </a>
        </Link>
      </TooltipTrigger>
      <StyledContent soon={soon}>
        {soon ? 'Coming Soon!' : name}
        {soon ? null : <Arrow />}
      </StyledContent>
    </Root>
  );
};

export default IconBox;
