import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import { ContentFetchMetadataById } from "@/actions/content/ContentFetchMetadataById";
import { ISection } from "@/types/Content";
import { extractFirstH1 } from "@/utils/helpers/ContentParser";
import { logger } from "@/utils/Logger";
import SidebarElement from "./SidebarElement";
import Error from "../Error";
import { ServerAuthContext } from "@/utils/ServerAuthContext";
export const dynamic = 'force-dynamic';




const Sidebar = async ({ id }: { id: string }) =>
{

    const fetchSections = async () =>
    {
        try
        {
            const contentFetchMetadataById = new ContentFetchMetadataById(id as string);
            const loggedIn = ServerAuthContext.isLoggedIn();
            const contentFetchById = new ContentsFetchById({ metadataId: id as string, all: loggedIn });
            const contents = await contentFetchById.execute();
            const titles = contents.map(content => extractFirstH1(content.content)).filter(title => title !== undefined) as string[];
            const contentMetadata = await contentFetchMetadataById.execute();
            const sections = contentMetadata?.sections ? contentMetadata.sections : [];
            const modifiedSections = sections.map((section) =>
            {
                if (titles.includes(section))
                {
                    return {
                        section,
                        locked: false
                    }
                }
                else
                {
                    return {
                        section,
                        locked: true
                    }
                }
            })
            return modifiedSections;
        }
        catch (err: any)
        {
            logger.error(err);
        }
    }

    const fetchedSections = await fetchSections();
    if (!fetchedSections)
    {
        return (
            <div className="w-1/4 h-screen bg-sky-900 flex flex-col flex-grow px-4 py-2">
                <Error error="Could Not Fetch Sections" />
            </div>
        )
    }
    const sections = fetchedSections as ISection[];

    return (
        <div className="w-1/4 h-screen bg-sky-900 flex flex-col flex-grow px-4 py-2">
            {sections.map((section, index) => (
                <SidebarElement section={section} key={index} />
            ))}
        </div>
    );
}

export default Sidebar;