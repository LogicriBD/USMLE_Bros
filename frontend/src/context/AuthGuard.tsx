import { isUserLoggedIn } from "@/database/config/auth";
import { useRouter } from "next/navigation";

const AuthGuard = (
    { children }: { children: React.ReactNode }
) =>
{
    const isUserActive = isUserLoggedIn();
    const router = useRouter();
    if (!isUserActive)
    {
        router.push("/");
    }
    return (
        <>
            {children}
        </>
    );
}

export default AuthGuard;