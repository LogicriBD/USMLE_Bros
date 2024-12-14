import ContentsMetadataDisplay from "../components/Content/ContentsMetadataDisplay";
import HomeSideBar from "../components/Content/HomeSideBar";
const Home = () =>
{
  return (
    <div className="flex flex-row w-full min-h-full h-full">
      <div className="tablet:w-1/3 w-1/6 flex flex-col justify-start">
        <HomeSideBar />
      </div>

      <div className="flex tablet:p-4 p-2 tablet:w-5/6 w-11/12 h-full">
        <ContentsMetadataDisplay />
      </div>
    </div>
  );
}

export default Home;
