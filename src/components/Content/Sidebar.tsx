import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import { ContentFetchMetadataById } from "@/actions/content/ContentFetchMetadataById";
import { ISection } from "@/types/Content";
import { extractFirstH1 } from "@/utils/helpers/ContentParser";
import { logger } from "@/utils/Logger";
import { ServerAuthContext } from "@/src/context/ServerAuthContext";
import { MobileSideBarContent, MobileSidebarError } from "./MobileSidebar";
import { DesktopSideBarContent, DesktopSideBarError } from "./DesktopSidebar";
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
            const extractedContents = contents.map(content =>
            ({
                title: extractFirstH1(content.content),
                isLocked: content.isLocked,
                serialNumber: content.serialNumber,
                id: content.id,
                content: content.content
            })).filter(title => title.title !== undefined);
            let contentsWithTitle = extractedContents.sort((a, b) => a.serialNumber - b.serialNumber);
            const contentMetadata = await contentFetchMetadataById.execute();
            const sections = contentMetadata?.sections ? contentMetadata.sections : [];
            const modifiedSections = sections.map((section) =>
            {
                const baseIndex = contentsWithTitle.findIndex(title => title.title === section);
                const currentContent = contentsWithTitle[baseIndex];
                contentsWithTitle = contentsWithTitle.filter((_, index) => index !== baseIndex);
                if (baseIndex !== -1)
                {
                    return {
                        id: currentContent.id,
                        section: currentContent.title ? currentContent.title : undefined,
                        locked: false,
                    }
                }
                else
                {
                    return {
                        id: "",
                        section: section,
                        locked: true,
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
            <>
                <MobileSidebarError error="Could Not Fetch Sections" />
                <DesktopSideBarError error="Could Not Fetch Sections" />
            </>
        )
    }
    const sections = fetchedSections as ISection[];

    return (
        <>
            <DesktopSideBarContent sections={sections} />
            <MobileSideBarContent sections={sections} />
        </>
    );
}

export default Sidebar;