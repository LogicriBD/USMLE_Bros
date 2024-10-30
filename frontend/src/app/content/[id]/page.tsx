"use client";
import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import { ContentFetchMetadataById } from "@/actions/content/ContentFetchMetadataById";
import { ContentData } from "@/database/repository/Content";
import Contents from "@/src/components/Content/ParseHTMLContent";
import Sidebar from "@/src/components/Content/Sidebar";
import Error from "@/src/components/Error";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { ContentDataWithTitle, ISection } from "@/types/Content";
import { LoreumIpsum } from "@/utils/constants/LoremIpsum";
import { extractFirstH1 } from "@/utils/helpers/ContentParser";
import { logger } from "@/utils/Logger";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


const ContentPage = () =>
{
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();
    const params = useParams();
    const [contents, setContents] = useState<any[]>([]);
    const [error, setError] = useState<string | undefined>();
    const [sections, setSections] = useState<ISection[]>([]);

    const fetchSections = async (titles: string[], contentMap: Map<string, ContentData>) =>
    {
        try
        {
            const contentMetadata = new ContentFetchMetadataById(params.id as string);
            const metadata = await contentMetadata.execute();
            const sections = metadata?.sections ? metadata.sections : [];
            const contents: ContentDataWithTitle[] = []
            const modifiedSections = sections.map((section, index) =>
            {
                if (titles.includes(section))
                {
                    contents.push({
                        ...contentMap.get(section)!,
                        isLocked: false
                    })
                    return {
                        section,
                        locked: false
                    }
                }
                else
                {
                    contents.push({
                        title: section,
                        content: `<p>${LoreumIpsum}</p>`,
                        isLocked: true,
                        serialNumber: index
                    })
                    return {
                        section,
                        locked: true
                    }
                }
            })
            setSections(modifiedSections)
            setContents(contents);
        }
        catch (err: any)
        {
            logger.error(err);
        }
    }

    const fetchContents = async () =>
    {
        try
        {
            const contentFetchById = new ContentsFetchById({
                metadataId: params.id as string,
                all: isLoggedIn
            });
            const contents = await contentFetchById.execute();
            setContents(contents);
            setContents((prev) =>
            {
                return prev.sort((a, b) => a.serialNumber - b.serialNumber)
            })
            const map = new Map<string, ContentData>();
            const titles = contents.map((content) =>
            {
                const currentTitle = extractFirstH1(content.content);
                if (currentTitle)
                {
                    map.set(currentTitle, content);
                    return currentTitle;
                }
            })
            await fetchSections(titles.filter((title) => title !== undefined), map);
            dispatch(loaderActions.turnOff());
        }
        catch (err: any)
        {
            setError(err.message);
            dispatch(loaderActions.turnOff());
        }

    }

    useEffect(() =>
    {
        fetchContents();
    }, [isLoggedIn])


    return (
        <div className="w-full flex flex-row h-screen">
            <Sidebar sections={sections} />
            <div className="w-full overflow-scroll px-4 py-2 mx-4 my-2">
                <Error error={error} />
                {contents.map((content) => (
                    <Contents key={content.id} content={content.content} isLocked={content.isLocked} title={content.title} />
                ))}
            </div>
        </div>
    );
}

export default ContentPage;