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
  variants: {
    soon: {
      true: {
        backgroundColor: 'transparent',
        opacity: 0.4,
      },
    },
  },

  '& img': {
    '@mobile': {
      width: '20px',
      height: '20px',
    },
  },
});

const IconBox: React.FC<IconBoxI> = ({ name, icon, href, soon }) => {
  return (
    <Root delayDuration={300}>
      <TooltipTrigger>
        <Link href={soon ? '/soon' : href}>
          <a>
            <Icon soon={soon}>{icon}</Icon>
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
