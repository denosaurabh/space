import { Root, Trigger, Content, Arrow } from '@radix-ui/react-tooltip';
import { styled } from '@styled';

const TooltipTrigger = styled(Trigger, {
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
});

const StyledContent = styled(Content, {
  padding: '0.6rem 1rem',
  backgroundColor: '#000',
  fontFamily: '$inter',
  fontSize: '0.8rem',
  color: '#fff',
  borderRadius: '0.5rem',
  variants: {
    soon: {
      true: {
        background: `linear-gradient(to right, #FFB88C, #DE6262)`,
      },
    },
  },
});

export { Arrow, Root, TooltipTrigger, StyledContent };
