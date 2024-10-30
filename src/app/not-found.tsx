const NotFound = () =>
{
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-xl text-gray-600 mt-4">Oops! Page not found</p>
                <p className="text-md text-gray-500 mt-2">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <a
                    href="/"
                    className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Go back to Homepage
                </a>
            </div>
        </div>
    );
};

export default NotFound;