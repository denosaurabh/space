import { IdProvider } from '@radix-ui/react-id';
import { AppProps, NextWebVitalsMetric } from 'next/app';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <IdProvider>
      <Component {...pageProps} />
    </IdProvider>
  );
};

export function reportWebVitals(metric: NextWebVitalsMetric): void {
  console.log(`${metric.name}: ${metric.value}`);
}

export default MyApp;
