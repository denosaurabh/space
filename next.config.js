const withPWA = require('next-pwa')
const prod = process.env.NODE_ENV === 'production'

module.exports = withPWA({
    pwa: {
        disable: prod ? false : true,
        dest: 'public'
    },
    webpack: (config, {dev, isServer}) => {
        // Replace React with PReact only in client production build
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                react: 'preact/compat',
                'react-dom/test-utils': 'preact/test-utils',
                'react-dom': 'preact/compat'
            })
        }

        return config;
    }
});