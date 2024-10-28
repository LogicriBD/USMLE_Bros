/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ContentCard from "@/src/components/Content/ContentCard";
import Filter from "@/src/components/Content/Filter";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../context/store/hooks";
import { loaderActions } from "../context/store/slices/loader-slice";

export default function Home()
{

  const [contents] = useState<any[]>([{ image: "/images/dummy.jpg", title: "How anatomy works" },
  { image: "/images/dummy.jpg", title: "A quick brown fox jumps over the lazy dog" },
  { image: "/images/dummy.jpg", title: "A quick brown fox jumps over the lazy dog" },
  { image: "/images/dummy.jpg", title: "A quick brown fox jumps over the lazy dog" },
  { image: "/images/dummy.jpg", title: "A quick brown fox jumps over the lazy dog" },
  { image: "/images/dummy.jpg", title: "A quick brown fox jumps over the lazy dog" }
  ]);
  const dispatch = useAppDispatch();

  useEffect(() =>
  {
    dispatch(loaderActions.turnOff());
  }, [])

  return (
    <div className="flex flex-col w-full p-4">
      <Filter />
      <div className="grid p-4 md:p-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 justify-center mx-auto max-w-7xl">
        {contents.map((content, index) => (
          <ContentCard key={index} image={content.image} title={content.title} description="Some short description" />
        ))}
      </div>
    </div>
  );
}
