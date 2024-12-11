"use client"
import { useAppSelector } from "@/src/context/store/hooks";
import Image from "next/image";

const Loader = () =>
{

    const isLoading = useAppSelector((state) => state.loader.isLoading);
    const message = useAppSelector((state) => state.loader.message);

    return isLoading ? (
        <div
            style={{ zIndex: "1600" }}
            className="fixed inset-0 flex flex-col space-y-2 justify-center items-center bg-black bg-opacity-50 z-50">
            <Image
                src="/logos/icon.png"
                alt="Loading"
                width={100}
                height={100}
                className="animate-pulse"
            />
            {message && (
                <div className="text-white font-bold text-md">{message}</div>
            )}
        </div>
    ) : null;
};

export default Loader;
