import { Root, Trigger, Content, Arrow } from '@radix-ui/react-tooltip';
import { styled } from '@styled';

const TooltipTrigger = styled(Trigger, {
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
});

const StyledContent = styled(Content, {
  padding: '1rem 1.6rem',
  backgroundColor: '#000',
  fontFamily: '$inter',
  fontSize: '1.4rem',
  color: '#fff',
  borderRadius: '1rem',
  variants: {
    soon: {
      true: {
        background: `linear-gradient(to right, #FFB88C, #DE6262)`,
      },
    },
    color: {
      warning: {
        backgroundColor: '#DE6262',
      },
    },
  },
});

export { Arrow, Root, TooltipTrigger, StyledContent };
