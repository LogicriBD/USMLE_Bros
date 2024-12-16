"use client";
import { logger } from "@/utils/Logger";
import { useEffect, useState } from "react";

const ADSENSE_CLIENT_ID = process.env.GOOGLE_ADSENSE_CLIENT;
type Props = {
    dataAdSlot: string | undefined;
    dataAdFormat: string;
    dataFullWidthResponsive: boolean;
}
const AdBanner = (props: Props) =>
{
    const [mounted, setMounted] = useState(false);

    useEffect(() =>
    {
        setMounted(true);
    }, []);

    useEffect(() =>
    {
        if (mounted && typeof window !== "undefined" && (window as any).adsbygoogle)
        {
            try
            {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            } catch (error)
            {
                logger.error("AdSense push error:", error);
            }
        }
    }, [mounted]);

    if (!mounted)
    {
        return null;
    }

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={`ca-${ADSENSE_CLIENT_ID}`}
            data-ad-slot={props.dataAdSlot}
            data-ad-format={props.dataAdFormat}
            data-full-width-responsive={props.dataFullWidthResponsive.toString()}
        ></ins>
    );
};

export default AdBanner;