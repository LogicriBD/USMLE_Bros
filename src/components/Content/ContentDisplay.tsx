import { logger } from "@/utils/Logger";
import Error from "../Error";
import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import ParseHTMLContent from "@/src/components/Content/ParseHTMLContent";
import { ServerAuthContext } from "@/src/context/ServerAuthContext";
import { ContentData } from "@/database/repository/Content";
import { IoIosLock } from "react-icons/io";
import Link from "next/link";
import { cookies } from "next/headers";
import { firestore } from "@/database/config/adminApp";
export const dynamic = 'force-dynamic';


const ContentDisplay = async ({ id }: { id: string }) =>
{

    const fetchContents = async (): Promise<ContentData[] | undefined> =>
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
            <div className="w-full overflow-x-hidden overflow-y-scroll bg-white px-4 py-2">
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
            <div className="w-full h-screen flex flex-col flex-grow overflow-auto">
                <div className="w-full overflow-x-hidden bg-white px-4 py-2">
                    <div
                        className="py-2 w-full">
                        <ParseHTMLContent id={contents[0].id} content={contents[0].content} />
                    </div>
                    <Link href="/authentication/login" style={{
                        all: "unset",
                    }}>
                        <div className="w-full h-[600px] bg-marrow flex flex-col justify-center items-center rounded-lg cursor-pointer">
                            <IoIosLock className="text-8xl text-cyan-200" />
                            <p className="text-white text-3xl font-bold font-semibold">Login to view more content</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }



}

export default ContentDisplay;