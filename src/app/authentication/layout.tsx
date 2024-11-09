const AuthenticationLayout = ({ children }: {
    children: React.ReactNode;
}) =>
{
    return (
        <div className="w-screen min-w-screen sm:h-full flex justify-center items-center">
            {children}
        </div>
    );
}

export default AuthenticationLayout;