import { styled } from '@styled';

import SettingSvg from '@assets/svg/Setting.svg';

import {
  Root,
  StyledTrigger,
  Anchor,
  StyledContent,
  StyledClose,
  StyledArrow,
} from '@components/popover';
import Input from '@components/input';

const SettingsButton: React.FC = () => {
  return (
    <Root>
      <StyledTrigger>
        <SettingsStyledSvg />
      </StyledTrigger>
      <Anchor />
      <StyledContent css={{ flexDirection: 'column' }}>
        Settings
        <StyledClose />
        <StyledArrow />
        <Input />
      </StyledContent>
    </Root>
  );
};

export default SettingsButton;

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
