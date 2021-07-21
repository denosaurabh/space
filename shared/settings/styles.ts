import { styled } from '@styled';

export const Section = styled('div', {
  width: '100%',
  height: 'fit-content',

  margin: '6rem 0',
});

export const SettingBox = styled('div', {
  display: 'flex',
  gap: '2rem',

  margin: '5rem 0',

  variants: {
    orientation: {
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      vertical: {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
  },
});

export const SubHeading = styled('h3', {
  fontSize: '3rem',
  fontFamily: '$inter',
  color: '$grey-800',

  marginBottom: '4rem',
});
