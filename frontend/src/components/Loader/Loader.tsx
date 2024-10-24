"use client"
import { useAppSelector } from "@/src/context/store/hooks";
import Image from "next/image";

const Loader = () => {

    const isLoading = useAppSelector((state) => state.loader.isLoading);

    return isLoading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <Image
                src="/logos/icon.png"
                alt="Loading"
                width={100}
                height={100}
                className="animate-pulse"
            />
        </div>
    ) : null;
};

export default Loader;
