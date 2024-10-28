"use client";
import Loading from "@/src/app/loading";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface ISection
{
    title: string;
    protected: boolean;
    section?: ISection[];
}

const Sidebar = () =>
{
    const section: ISection[] = [
        {
            title: 'Introduction', protected: false, section: [
                { title: 'Getting Started', protected: false },
                {
                    title: 'Authentication', protected: true,
                    section: [
                        { title: 'Database', protected: true },
                        { title: 'Storage', protected: true },
                        {
                            title: 'Hosting', protected: true, section: [
                                { title: 'Functions', protected: true },
                            ]
                        },
                        { title: 'Functions', protected: true },
                    ]
                },
                { title: 'Database', protected: true },

            ]
        },
        { title: 'Getting Started', protected: false },
        { title: 'Authentication', protected: true },
        { title: 'Database', protected: true },
        { title: 'Storage', protected: true },
        { title: 'Hosting', protected: true },
        { title: 'Functions', protected: true },
    ]

    const [sectionVisibility, setSectionVisiblity] = useState<any>({});
    const [childComponents, setChildComponents] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    const childrenVisibilityToggler = (depth: number, index: number) =>
    {
        childComponents[`${depth}-${index}`].forEach((item: string) =>
        {
            setSectionVisiblity((prevSection) =>
            {
                return { ...prevSection, [item]: !sectionVisibility[item] }
            });
        });

    }

    const [components, setComponents] = useState<any>();

    const recursiveSectionVisibilityHandler = (section: ISection[], depth: number) =>
    {
        section.forEach((item: ISection, index: number) =>
        {
            if (depth === 0)
            {
                setSectionVisiblity((prevSection) =>
                {
                    return { ...prevSection, [`${depth}-${index}`]: true }
                });
            }
            else
            {
                setSectionVisiblity((prevSection) =>
                {
                    return { ...prevSection, [`${depth}-${index}`]: false }
                });
            }
            if (item.section)
            {
                setChildComponents((prevChildComponents) =>
                {
                    return { ...prevChildComponents, [`${depth}-${index}`]: item.section!.map((_, index) => `${depth + 1}-${index}`) }
                });
                recursiveSectionVisibilityHandler(item.section, depth + 1);
            }
            else
            {
                setChildComponents((prevChildComponents) =>
                {
                    return { ...prevChildComponents, [`${depth}-${index}`]: [] }
                });
            }
        });
    }

    useEffect(() =>
    {
        setLoading(true);
        recursiveSectionVisibilityHandler(section, 0);
        setLoading(false);
    }, [])

    useEffect(() =>
    {
        if (sectionVisibility)
        {
            setComponents(recursiveSectionComponentGenerator(section, 0));
        }
    }, [sectionVisibility])



    const recursiveSectionComponentGenerator = (section: any, depth: number) =>
    {
        if (!section)
        {
            return null;
        }
        else
        {
            return section.map((item: ISection, index: number) =>
            {
                return (
                    <div key={`${depth}-${index}`} style={{
                        marginLeft: `${depth * 10}px`
                    }} className={`${!sectionVisibility[`${depth}-${index}`] ? "hidden" : ""} my-2 p-2 w-full flex flex-col items-start justify-start cursor-pointer`}
                    >
                        <div className={`flex ${item.protected ? "text-yellow-600" : "text-white"}`} onClick={() => childrenVisibilityToggler(depth, index)}>
                            <div className={`border-2 rounded-full px-1 me-3 ${item.protected ? "border-yellow-600" : "border-white"}`}><FontAwesomeIcon icon={!item.protected ? faUnlock : faLock} /></div>
                            <div className="px-1 me-3">{item.title}</div>
                            <div className="px-1 py-1 me-3">{item.section ? (<IoMdArrowDropdown />) : ""}</div>
                        </div>
                        {recursiveSectionComponentGenerator(item.section, depth + 1)}
                    </div>
                )
            })
        }
    }

    if (loading)
    {
        return (
            <Loading />
        )
    }


    return (
        <div className="h-screen bg-sky-900 flex flex-col flex-grow px-4 py-2">
            {components}
        </div>
    );
}

export default Sidebar;