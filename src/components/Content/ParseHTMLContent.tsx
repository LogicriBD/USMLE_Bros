"use client";
import parse from 'html-react-parser';
import { H1, H2, H3 } from '../CustomStyle/Headers';
import { useEffect } from 'react';
import { useAppDispatch } from '@/src/context/store/hooks';
import { loaderActions } from '@/src/context/store/slices/loader-slice';

interface IParseHTMLContent
{
    id?: string;
    content: string;
}

const ParseHTMLContent = ({ id, content }: IParseHTMLContent) =>
{

    const dispatch = useAppDispatch();
    useEffect(() =>
    {
        dispatch(loaderActions.turnOff());
    }, [])

    const getTextFromChildren = (children) =>
    {
        if (!children) return '';

        if (Array.isArray(children))
        {
            return children.map(child =>
            {
                if (typeof child === 'string')
                {
                    return child;
                } else if (child && child.type === 'text')
                {
                    return child.data;
                }
                return null;
            }).join('');
        }

        return '';
    };

    const options = {
        replace: (domNode) =>
        {
            const textContent = getTextFromChildren(domNode.children);
            if (domNode.name === 'h1')
            {
                return <H1>{textContent}</H1>;
            }
            if (domNode.name === 'h2')
            {
                return <H2>{textContent}</H2>;
            }
            if (domNode.name === 'h3')
            {
                return <H3>{textContent}</H3>;
            }
            return null;
        },
    };

    return (
        <div id={id} className='w-full'>
            {parse(content, options)}
        </div>
    )
}

export default ParseHTMLContent;