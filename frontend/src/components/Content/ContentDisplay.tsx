import { logger } from "@/utils/Logger";
import Error from "../Error";
import { ContentFetchMetadataById } from "@/actions/content/ContentFetchMetadataById";
import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import { extractFirstH1 } from "@/utils/helpers/ContentParser";
import { ContentDataWithTitle } from "@/types/Content";
import ParseHTMLContent from "@/src/components/Content/ParseHTMLContent";
import { LoreumIpsum } from "@/utils/constants/LoremIpsum";
import { ServerAuthContext } from "@/src/context/ServerAuthContext";
export const dynamic = 'force-dynamic';


const ContentDisplay = async ({ id }: { id: string }) =>
{
    const fetchContents = async (): Promise<ContentDataWithTitle[] | undefined> =>
    {
        try
        {
            const contentFetchMetadataById = new ContentFetchMetadataById(id as string);
            const loggedIn = ServerAuthContext.isLoggedIn();
            const contentFetchById = new ContentsFetchById({ metadataId: id as string, all: loggedIn });
            const contents = await contentFetchById.execute();
            const sortedContents = contents.sort((a, b) => a.serialNumber - b.serialNumber);
            const titles = contents.map(content => extractFirstH1(content.content)).filter(title => title !== undefined) as string[];
            const contentMetadata = await contentFetchMetadataById.execute();
            const sections = contentMetadata?.sections ? contentMetadata.sections : [];
            let baseIndex = 0;
            const modifiedContents = sections.map((section, index) =>
            {
                if (titles.includes(section))
                {
                    return {
                        id: sortedContents[baseIndex].id,
                        title: section,
                        isLocked: false,
                        content: sortedContents[baseIndex++].content,
                        serialNumber: index
                    }
                }
                else
                {
                    return {
                        id: "",
                        title: section,
                        isLocked: true,
                        content: "",
                        serialNumber: index
                    }
                }
            })
            return modifiedContents;
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
            <div className="h-screen bg-sky-900 flex flex-col flex-grow px-4 py-2">
                <Error error="Could Not Fetch Sections" />
            </div>
        )
    }
    const contents = fetchedContents;

    return (
        <div className="w-full overflow-scroll px-4 py-2 mx-4 my-2">
            {contents.map((content, index) => (
                <ParseHTMLContent id={content.id} key={index} content={content.content} isLocked={content.isLocked} title={content.title} />
            ))}
        </div>
    );
}

export default ContentDisplay;