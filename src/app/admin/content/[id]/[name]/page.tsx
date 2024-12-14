/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { Content, ContentData, ContentMetaData } from "@/database/repository/Content";
import { ContentCreate } from "@/actions/content/ContentCreate";
import { logger } from "@/utils/Logger";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { submitActions } from "@/src/context/store/slices/submit-slice";
import { extractFirstH1, splitContentByH1Sections } from "@/utils/helpers/ContentParser";
import { ContentsFetchById } from "@/actions/content/ContentFetchById";
import { ContentDeleteById } from "@/actions/content/ContentDeleteById";
import { routes } from "@/src/api/Routes";
import CustomEditor from "@/src/components/Upload/CustomEditor";
import SpinLoading from "@/src/components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSave } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "@/src/hooks/useNavigate";
import { useParams, useSearchParams } from "next/navigation";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";


const ContentEditorPage = () =>
{
    const editorRef = useRef<any>(null);
    const navigator = useNavigate();

    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const [sections, setSections] = useState<string[]>([]);

    const modalData: Partial<ContentMetaData> | undefined = (() =>
    {

        if (!searchParams) return undefined;

        const data: Partial<ContentMetaData> = {};
        searchParams.forEach((value, key) =>
        {
            data[key] = value;
        })

        return data;
    })();
    const [content, setContent] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | undefined>("");
    const [contentHeader, setContentHeader] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const { id, name } = useParams()
    const selectedCategory: { id: string, name: string } = { id: id as string, name: name as string }
    const user = useAppSelector((state) => state.user);

    const fetchContent = async (metadataId: string) =>
    {
        try
        {
            const contentByMetadataIdAction = new ContentsFetchById({ metadataId: metadataId, all: true });
            const contents = await contentByMetadataIdAction.execute();
            const sortedContents = contents.sort((a, b) => a.serialNumber - b.serialNumber);
            const content = sortedContents.map((content) => content.content).join("\n");
            const parser = new DOMParser();
            const doc = parser.parseFromString(content, "text/html");
            const h1Elements = doc.querySelectorAll("h1");

            h1Elements.forEach((h1) =>
            {
                const content = h1.textContent?.trim() || "";
                setSections((sections) => [...sections, content]);
            });

            const updatedHTML = doc.body.innerHTML;
            setContent(updatedHTML);
            setLoading(false);
        }
        catch (err: any)
        {
            logger.error(err);
            setError(err.message);
        }
        finally
        {
            setLoading(false);
        }
    }

    const uploadAndReplaceImageSrc = async () =>
    {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const imgTags = Array.from(doc.querySelectorAll('img'));
        let metadataImageUrl = "";
        for (const imgTag of imgTags)
        {
            const src = imgTag.getAttribute('src');
            if (src)
            {
                const file = await fetch(src).then((r) => r.blob());
                const formData = new FormData();
                formData.append('file', file);

                try
                {
                    const response = await fetch(routes.content.upload, {
                        method: "POST",
                        body: formData,
                    });
                    const data = await response.json();
                    console.log("Image Uploaded:", data.file.url);
                    imgTag.setAttribute('src', data.file.url);
                    if (imgTags.indexOf(imgTag) === 0)
                    {
                        metadataImageUrl = data.file.url;
                    }
                } catch (error)
                {
                    console.error('Error uploading image:', error);
                }
            }
        }
        const newContent = doc.body.innerHTML;
        return { newContent, metadataImageUrl };
    };

    const handleSubmit = async () =>
    {
        if (title === "")
        {
            setError("Title is required");
            return;
        }
        try
        {
            dispatch(loaderActions.turnOn());

            setError(undefined);

            if (selectedCategory)
            {
                const { newContent, metadataImageUrl } = await uploadAndReplaceImageSrc();
                const contentSections = splitContentByH1Sections(newContent);
                const sections = contentSections.map((newContent) =>
                {
                    const section = extractFirstH1(newContent);
                    if (section)
                    {
                        return section
                    }
                    else
                    {
                        return null;
                    }
                })
                const filterNullSections = sections.filter((section) => section !== null);

                const metadata: ContentMetaData = {
                    title: title,
                    categoryId: selectedCategory.id,
                    userName: user.name,
                    createdAt: new Date(),
                    userId: user.id
                }
                if (metadataImageUrl !== "")
                {
                    metadata.imageUrl = metadataImageUrl;
                }
                if (filterNullSections.length > 0)
                {
                    metadata.sections = filterNullSections.filter(section => section !== null) as string[];
                }

                const contentdata: ContentData[] = contentSections.map((section, index) => (
                    {
                        content: section,
                        isLocked: index === 0 ? false : true,
                        serialNumber: index
                    }
                ));

                const formattedContent: Content = {
                    metadata: metadata,
                    content: contentdata
                }
                if (modalData && modalData.id)
                {
                    const contentDeleteAction = new ContentDeleteById({ id: modalData.id });
                    await contentDeleteAction.execute();
                }
                const contentAction = new ContentCreate({ content: formattedContent });
                await contentAction.execute();
                console.log(metadata)
                dispatch(submitActions.toggleSubmit());
                if (editorRef.current)
                {
                    editorRef.current.clearContents();
                    setSections([]);
                }
            }
        } catch (error)
        {
            logger.error(error);
        } finally
        {
            dispatch(loaderActions.turnOff());
            dispatch(modalActions.updateModalData({
                type: modalData && modalData.id && modalData.title ? "Updated" : "Added",
            }));
            dispatch(modalActions.updateModalType(ModalName.ContentSuccess))
        }
    }

    useEffect(() =>
    {
        if (modalData && modalData.id && modalData.title) 
        {
            setContentHeader(modalData.title);
            setTitle(modalData.title);
            setLoading(true);
            fetchContent(modalData.id);
        }
        else
        {
            setContentHeader(`New Content ${selectedCategory && (`for ${selectedCategory.name}`)}`)
        }
    }, []);

    if (loading)
    {
        return (
            <SpinLoading />
        )
    }

    return (<div className="bg-white flex flex-col w-full min-h-full max-h-fit px-4 py-2 border border-white rounded-lg">
        <div className="w-full py-2 text-lg font-semibold flex justify-between">
            <div>{contentHeader}</div>
            <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-3 py-2 rounded-md mr-2 flex flex-row" onClick={handleSubmit}><FontAwesomeIcon icon={faSave} className="mr-2 pt-1" /><span className="lg:block hidden">Save</span></button>
                <button className="bg-white text-red-600 hover:bg-red-200 px-3 py-2 rounded-md" onClick={() => navigator("/admin/upload")}><FontAwesomeIcon icon={faClose} /></button>
            </div>
        </div>
        <div className="w-full py-2">
            <input type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-2 px-3 text-black font-semibold bg-gray-100 rounded-md border border-gray-600 focus:border-gray-800 focus:outline-none"
                placeholder="Title"
            />
            {error && (<div className="text-red-500 font-normal text-sm px-2">{error}</div>)}
        </div>
        <div className="w-full">
            <CustomEditor ref={editorRef} value={content} onChange={setContent} sections={sections} />
        </div>
    </div>);
}

export default ContentEditorPage;