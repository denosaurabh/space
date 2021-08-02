import { styled } from '@styled';

import useSettings from '@state/settings';

import SunSvg from '@assets/svg/Sun.svg';
import MoonSvg from '@assets/svg/Moon.svg';

const ThemeSvgContainer = styled('button', {
  backgroundColor: 'transparent',
  transition: '$medium',

  margin: '0 1rem',

  '& svg': {
    fill: '$grey-700',
  },

  '&:hover': {
    cursor: 'pointer',
  },
});

const ThemeButton: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useSettings((state) => ({
    isDarkTheme: state.darkTheme,
    toggleTheme: state.toggleTheme,
  }));

  return (
    <ThemeSvgContainer>
      {isDarkTheme ? (
        <SunSvg onClick={toggleTheme} />
      ) : (
        <MoonSvg onClick={toggleTheme} />
      )}
    </ThemeSvgContainer>
  );
};

export default ThemeButton;
