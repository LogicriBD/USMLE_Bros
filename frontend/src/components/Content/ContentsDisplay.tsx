/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import { useAppDispatch } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";

const ContentsDisplay = () =>
{
    const dispatch = useAppDispatch();
    const [contents] = useState<any[]>([
        { "id": 1, "image": "/images/dummy.jpg", "title": "How anatomy works" },
        { "id": 2, "image": "/images/dummy.jpg", "title": "A quick brown fox jumps over the lazy dog" },
        { "id": 3, "image": "/images/dummy.jpg", "title": "A quick brown fox jumps over the lazy dog" },
        { "id": 4, "image": "/images/dummy.jpg", "title": "A quick brown fox jumps over the lazy dog" },
        { "id": 5, "image": "/images/dummy.jpg", "title": "A quick brown fox jumps over the lazy dog" },
        { "id": 6, "image": "/images/dummy.jpg", "title": "A quick brown fox jumps over the lazy dog" }
    ]
    );

    useEffect(() =>
    {
        dispatch(loaderActions.turnOff())
    }, [])

    return (<div className="grid p-4 md:p-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-center mx-auto max-w-7xl">
        {contents.map((content, index) => (
            <ContentCard id={content.id} key={index} image={content.image} title={content.title} description="Some short description" />
        ))}
    </div>);
}

export default ContentsDisplay;