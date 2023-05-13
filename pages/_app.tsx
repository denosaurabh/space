import { useEffect } from 'react';
import { AppProps, NextWebVitalsMetric } from 'next/app';

import { globalStyles } from '@styled';
import useSettings from '@state/settings';
import * as Tooltip from '@radix-ui/react-tooltip';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { isDarkTheme, setUserOld } = useSettings((state) => ({
    isDarkTheme: state.darkTheme,
    setUserOld: state.setUserOld,
  }));

  globalStyles();

  useEffect(() => {
    if (!document.body) return;

    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    return () => {
      console.log('bye!');
      setUserOld();
    };
  }, [isDarkTheme, setUserOld]);

  return (
    <Tooltip.Provider>
      <Component {...pageProps} />
    </Tooltip.Provider>
  );
};

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  console.log(`${metric.name}: ${metric.value}`);
}

export default MyApp;
