const AuthenticationLayout = ({ children }: {
    children: React.ReactNode;
}) =>
{
    return (
        <div className="w-screen min-w-screen sm:h-full sm:min-h-screen flex justify-center items-center">
            {children}
        </div>
    );
}

export default AuthenticationLayout;