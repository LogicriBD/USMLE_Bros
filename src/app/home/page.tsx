import { Metadata } from "next";
import ContentsMetadataDisplay from "../../components/Content/ContentsMetadataDisplay";
import HomeSideBar from "../../components/Content/HomeSideBar";

export const metadata: Metadata = {
  title: "USMLE Bros | Get your USMLE study materials",
  description: "USMLE Bros is a platform for medical students to share and learn from each other.",
  authors: [{
    name: "USMLE Bros",
    url: "https://usmlebros.com/",
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
  keywords: ["USMLE", "Bros", "USMLE Home", "USMLE Content", "USMLE Contents", "USMLE Step 1", "USMLE Step 2"]
};

const HomePage = () =>
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

export default HomePage;
