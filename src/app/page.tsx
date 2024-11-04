import ContentsMetadataDisplay from "../components/Content/ContentsMetadataDisplay";
import HomeSideBar from "../components/Content/HomeSideBar";

export default function Home()
{

  return (
    <div className="flex flex-row w-full max-h-full min-h-screen">
      <div className="md:w-1/3 w-1/6 min-h-screen max-h-full flex flex-col md:justify-end justify-start">
        <HomeSideBar />
      </div>
      <div className="flex md:p-4 p-2 md:w-5/6 w-11/12 min-h-screen max-h-full mb-12 md:mb-0">
        <ContentsMetadataDisplay />
      </div>
    </div>
  );
}
