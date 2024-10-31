import Image from "next/image";

const Loading = () =>
{
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div
                style={{ zIndex: "1600" }}
                className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                <Image
                    src="/logos/icon.png"
                    alt="Loading"
                    width={100}
                    height={100}
                    className="animate-pulse"
                />
            </div>
        </div>
    );
}

export default Loading;