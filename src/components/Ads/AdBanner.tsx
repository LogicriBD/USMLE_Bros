"use client";
import { useEffect } from "react";

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;
type Props = {
    dataAdSlot: string | undefined;
    dataAdFormat: string;
    dataFullWidthResponsive: boolean;
}
const AdBanner = (props: Props) => {

    useEffect(() => {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    }, []);

    return (
        <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={`ca-${ADSENSE_CLIENT_ID}`}
            data-ad-slot={props.dataAdSlot}
            data-ad-format={props.dataAdFormat}
            data-full-width-responsive={props.dataFullWidthResponsive.toString()}></ins>
    );
}

export default AdBanner;