/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const withPWA = require('next-pwa');
// const withBundleStats = require('next-plugin-bundle-stats');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const prod = process.env.NODE_ENV === 'production';

module.exports = withPlugins([withPWA, withBundleAnalyzer], {
  pwa: {
    disable: prod ? false : true,
    dest: 'public',
  },
  async redirects() {
    return [
      {
        source: '/notes',
        destination: '/notes/home',
        permanent: true,
      },
    ];
  },
  webpack: (
    config
    // { dev, isServer }
  ) => {
    // // Replace React with PReact only in client production build
    // if (!dev && !isServer) {
    //   Object.assign(config.resolve.alias, {
    //     react: 'preact/compat',
    //     'react-dom/test-utils': 'preact/test-utils',
    //     'react-dom': 'preact/compat',
    //   });
    // }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
});
