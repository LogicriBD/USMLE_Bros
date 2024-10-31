import { logger } from "@/utils/Logger";
import Error from "../Error";
import { ContentFetchMetadataById } from "@/actions/content/ContentFetchMetadataById";
import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import { extractFirstH1 } from "@/utils/helpers/ContentParser";
import { ContentAllData } from "@/types/Content";
import ParseHTMLContent from "@/src/components/Content/ParseHTMLContent";
import { ServerAuthContext } from "@/src/context/ServerAuthContext";
import { ContentMetaData } from "@/database/repository/Content";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
export const dynamic = 'force-dynamic';


const ContentDisplay = async ({ id }: { id: string }) =>
{
    const fetchContents = async (): Promise<ContentAllData | undefined> =>
    {
        try
        {
            const contentFetchMetadataById = new ContentFetchMetadataById(id);
            const loggedIn = ServerAuthContext.isLoggedIn();
            const contentFetchById = new ContentsFetchById({ metadataId: id, all: loggedIn });
            const contents = await contentFetchById.execute();
            const extractedContents = contents.map(content =>
            ({
                title: extractFirstH1(content.content),
                isLocked: content.isLocked,
                serialNumber: content.serialNumber,
                id: content.id,
                content: content.content
            })).filter(title => title.title !== undefined);
            let contentsWithTitle = extractedContents.sort((a, b) => a.serialNumber - b.serialNumber);
            const contentMetadata: ContentMetaData | undefined = await contentFetchMetadataById.execute();
            const sections = contentMetadata?.sections ? contentMetadata.sections : [];
            const modifiedContents = sections.map((section, index) =>
            {
                const baseIndex = contentsWithTitle.findIndex(title => title.title === section);
                const currentContent = contentsWithTitle[baseIndex];
                contentsWithTitle = contentsWithTitle.filter((_, index) => index !== baseIndex);
                if (baseIndex !== -1)
                {
                    return {
                        id: currentContent.id,
                        title: currentContent.title ? currentContent.title : undefined,
                        isLocked: false,
                        content: currentContent.content,
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
            return {
                username: contentMetadata?.userName ? contentMetadata.userName : "",
                createdAt: contentMetadata?.createdAt ? contentMetadata.createdAt : null,
                metadataTitle: contentMetadata?.title ? contentMetadata.title : "",
                contentDataWithTitle: modifiedContents
            };
        }
        catch (err: any)
        {
            logger.error(err);
        }
    }

    const fetchedContents = await fetchContents();
    if (!fetchedContents?.contentDataWithTitle)
    {
        return (
            <div className="h-screen bg-gray-50 flex flex-col flex-grow px-4 py-2">
                <Error error="Could Not Fetch Sections" />
            </div>
        )
    }
    const contents = fetchedContents;
    return (
        <div className="w-full overflow-y-scroll bg-white px-4 py-2">
            <div className="flex items-center justify-center flex-col border-b border-gray-400 py-2">
                <div className="py-2 text-2xl md:text-4xl font-bold text-gray-800 w-full flex justify-center">{contents.metadataTitle}</div>
                <div className="pt-1 flex justify-center text-sm text-gray-500 font-normal">Author: {contents.username}</div>
                {contents.createdAt && <div className="py-1 flex justify-center text-sm text-gray-500 font-normal">
                    {formatFirebaseDate(contents.createdAt)}
                </div>}
            </div>
            {contents.contentDataWithTitle.map((content, index) => (
                <div
                    key={index}
                    className="py-2">
                    <ParseHTMLContent id={content.id} key={index} content={content.content ? content.content : ""} isLocked={content.isLocked} title={content.title} />
                </div>
            ))}
        </div>
    );
}

export default ContentDisplay;