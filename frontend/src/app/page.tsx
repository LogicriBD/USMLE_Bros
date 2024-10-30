import Filter from "@/src/components/Content/Filter";
import ContentsDisplay from "../components/Content/ContentsDisplay";

export default function Home()
{

  return (
    <div className="flex flex-col w-full p-4">
      <Filter />
      <ContentsDisplay />
    </div>
  );
}
