import { logger } from "@/utils/Logger";
import Error from "../Error";
import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import ParseHTMLContent from "@/src/components/Content/ParseHTMLContent";
import { ServerAuthContext } from "@/src/context/ServerAuthContext";
import { ContentData } from "@/database/repository/Content";
import ProtectedContent from "./ProtectedContent";
export const dynamic = 'force-dynamic';


const ContentDisplay = async ({ id }: { id: string }) =>
{

    const fetchContents = async (): Promise<ContentData[] | undefined> =>
    {
        try
        {
            const loggedIn = ServerAuthContext.isLoggedIn();
            const contentFetchById = new ContentsFetchById({ metadataId: id, all: loggedIn });
            const contents = await contentFetchById.execute();
            return contents.sort((a, b) => a.serialNumber - b.serialNumber);
        }
        catch (err: any)
        {
            logger.error(err);
        }
    }

    const fetchedContents = await fetchContents();
    if (!fetchedContents)
    {
        return (
            <div className="h-full bg-gray-50 flex flex-col flex-grow px-4 py-2">
                <Error error="Could Not Fetch Sections" />
            </div>
        )
    }
    const contents = fetchedContents;
    if (ServerAuthContext.isLoggedIn())
    {
        return (
            <div className="w-full overflow-y-scroll scrollbar-thin bg-white px-4 py-4">
                {contents.map((content, index) => (
                    <div
                        key={index}
                        className="py-2 w-full">
                        <ParseHTMLContent key={index} id={content.id} content={content.content ? content.content : ""} />
                    </div>
                ))}
            </div>
        );
    }
    else
    {
        return (
            <div className="w-full h-full flex flex-col flex-grow overflow-auto">
                <div className="w-full overflow-x-hidden bg-white tablet:px-4 px-2 py-4">
                    <div
                        className="py-2 w-full">
                        <ParseHTMLContent id={contents[0].id} content={contents[0].content} />
                    </div>
                    <ProtectedContent />
                </div>
            </div>
        )
    }



}

export default ContentDisplay;