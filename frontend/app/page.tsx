"use client";
import Filter from "@/components/Content/Filter";
import { useState } from "react";

export default function Home() {

  const [categories, setCategories] = useState<string[]>(["Anatomy", "Physiology", "Pathology", "Biochemistry"]);

  return (
    <div className="flex flex-col w-full p-4">
      <Filter categories={categories} />
    </div>
  );
}
