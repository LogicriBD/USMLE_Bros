const AccessDeniedPage = () =>
{
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800">Access Denied</h1>
                <p className="text-xl text-gray-600 mt-4">Sorry you do not have access to view this page {":("}</p>
                <p className="text-md text-gray-500 mt-2">
                    This page you requested can only be accessed by administrators
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

export default AccessDeniedPage;