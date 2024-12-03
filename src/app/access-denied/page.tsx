/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useAppDispatch } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import Link from "next/link";
import { useEffect } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "USMLE Bros | Access Denied",
    description: "You are not allowed to view this page",
    authors: [{
        name: "USMLE Bros",
        url: "https://usmle-bros.vercel.app/",
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
    keywords: ["USMLE", "Bros", "Access Denied", "Access Denied Page", "USMLE Bros Access Denied", "USMLE Bros Access Denied Page"]
}

const AccessDeniedPage = () =>
{

    const dispatch = useAppDispatch();

    useEffect(() =>
    {
        dispatch(loaderActions.turnOff());
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-marrow">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-white">Access Denied</h1>
                <p className="text-xl text-white mt-4">Sorry you do not have access to view this page {":("}</p>
                <p className="text-md text-white mt-2">
                    This page you requested can only be accessed by administrators
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block px-6 py-3 bg-marrow-dark text-white rounded-lg hover:bg-cyan-900 transition duration-300"
                >
                    Go back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default AccessDeniedPage;