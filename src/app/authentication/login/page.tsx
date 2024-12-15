import AuthCard from "@/src/components/Authentication/AuthCard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "USMLE Bros | Login",
    description: "Login to your USMLE Bros account to access the features!",
    authors: [{
        name: "USMLE Bros",
        url: "https://usmlebros.com/",
    }, {
        name: "RobustTech BD",
        url: "https://robustechbd.com/"
    }],
    icons: [
        {
            href: "/logos/icon.png",
            sizes: "192x192",
            type: "image/png",
            url: "/logos/icon.png",
        },
    ],
    keywords: ["USMLE", "Bros", "Login", "Sign In", "Sign Up", "Sign In for USMLE Bros", "USMLE Bros Sign In", "USMLE Bros Login", "USMLE Bros Sign In Page", "USMLE Bros Login Page", "USMLE Bros Sign Up Page"]
}

const LoginPage = () =>
{
    return (
        <AuthCard />
    )
}

export default LoginPage;