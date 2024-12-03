"use client";
import ContentsMetadataDisplay from "../components/Content/ContentsMetadataDisplay";
import HomeSideBar from "../components/Content/HomeSideBar";

const Home = () =>
{
  return (
    <div className="flex flex-row w-full min-h-full h-full">
      <div className="md:w-1/3 w-1/6 flex flex-col justify-start">
        <HomeSideBar />
      </div>

      <div className="flex md:p-4 p-2 md:w-5/6 w-11/12 h-full">
        <ContentsMetadataDisplay />
      </div>
    </div>
  );
}

export default Home;
