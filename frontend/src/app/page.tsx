import Filter from "@/src/components/Content/Filter";
import ContentsMetadataDisplay from "../components/Content/ContentsMetadataDisplay";

export default function Home()
{

  return (
    <div className="flex flex-col w-full p-4">
      <Filter />
      <ContentsMetadataDisplay />
    </div>
  );
}
