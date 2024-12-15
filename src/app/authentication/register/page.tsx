import RegisterCard from "@/src/components/Authentication/RegisterCard";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "USMLE Bros | Register",
    description: "Register as a USMLE Bros member to access the features!",
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
    keywords: ["USMLE", "Bros", "Register", "Sign Up", "Sign In", "Sign Up for USMLE Bros", "USMLE Bros Sign Up", "USMLE Bros Register", "USMLE Bros Sign In", "USMLE Bros Sign Up Page", "USMLE Bros Register Page", "USMLE Bros Sign In Page"]
}

const RegisterPage = () =>
{
    return (
        <RegisterCard />
    )
}

export default RegisterPage;