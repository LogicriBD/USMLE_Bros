import Script from "next/script";

const ADSENSE_CLIENT_ID = process.env.GOOGLE_ADSENSE_CLIENT;
const AdSense = () =>
{
    return (
        <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${ADSENSE_CLIENT_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
        />
    );
}

export default AdSense;