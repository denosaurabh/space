const MyApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}

export function reportWebVitals(metric) {
    console.log(`${metric.name}: ${metric.value}`)
}

export default MyApp;