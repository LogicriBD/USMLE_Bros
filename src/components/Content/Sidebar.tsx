import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import { ContentFetchMetadataById } from "@/actions/content/ContentFetchMetadataById";
import { ISection } from "@/types/Content";
import { extractFirstH1 } from "@/utils/helpers/ContentParser";
import { logger } from "@/utils/Logger";
import { ServerAuthContext } from "@/src/context/ServerAuthContext";
import { MobileSideBarContent, MobileSidebarError } from "./MobileSidebar";
import { DesktopSideBarContent, DesktopSideBarError } from "./DesktopSidebar";
import { cookies } from "next/headers";
import { firestore } from "@/database/config/adminApp";
export const dynamic = 'force-dynamic';




const Sidebar = async ({ id }: { id: string }) =>
{
    const fetchSections = async () =>
    {
        try
        {
            const cookieStore = await cookies();
            const cookie = cookieStore.get("access");
            if (!cookie)
            {
                ServerAuthContext.setLoggedIn(false);
            }
            else
            {
                const session = await firestore.collection("sessions").where("accessToken", "==", cookie.value);
                const sessionSnapshot = await session.get();
                if (sessionSnapshot.empty)
                {
                    ServerAuthContext.setLoggedIn(false);
                }
                else
                {
                    const sessionData = await sessionSnapshot.docs[0].data();
                    const isActive = sessionData.active === true;
                    ServerAuthContext.setLoggedIn(isActive);
                }
            }
            const contentFetchMetadataById = new ContentFetchMetadataById(id as string);
            const metadata = await contentFetchMetadataById.execute();
            if (!metadata)
            {
                throw new Error("Could not fetch sections");
            }
            const sections = metadata.sections;
            const loggedIn = ServerAuthContext.isLoggedIn();
            const contentFetchById = new ContentsFetchById({ metadataId: id as string, all: loggedIn });
            const contents = await contentFetchById.execute();
            const extractedSections = contents.map(content =>
            ({
                section: extractFirstH1(content.content),
                locked: content.isLocked,
                serialNumber: content.serialNumber,
                id: content.id,
            })).filter(content => content.section !== undefined).sort((a, b) => a.serialNumber - b.serialNumber);
            if (!sections)
            {
                throw new Error("Could not fetch sections");
            }
            if (!loggedIn)
            {
                return sections.map((section, index) =>
                {
                    if (index === 0)
                    {
                        return {
                            section: section,
                            locked: false,
                            id: extractedSections[0].id,
                        }
                    }
                    return {
                        section: section,
                        locked: true,
                    }
                })
            }
            else
            {
                return sections.map((section, index) =>
                {
                    return {
                        id: extractedSections[index].id,
                        section: section,
                        locked: false,
                    }
                })
            }
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