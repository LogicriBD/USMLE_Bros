/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Filter from "@/src/components/Content/Filter";
import { useEffect } from "react";
import { useAppDispatch } from "../context/store/hooks";
import { loaderActions } from "../context/store/slices/loader-slice";
import ContentsDisplay from "../components/Content/ContentsDisplay";

export default function Home()
{

  const dispatch = useAppDispatch();

  useEffect(() =>
  {
    dispatch(loaderActions.turnOff());
  }, [])

  return (
    <div className="flex flex-col w-full p-4">
      <Filter />
      <ContentsDisplay />
    </div>
  );
}
