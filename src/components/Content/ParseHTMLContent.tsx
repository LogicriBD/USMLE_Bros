/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import parse from 'html-react-parser';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useEffect } from 'react';
import { useAppDispatch } from '@/src/context/store/hooks';
import { loaderActions } from '@/src/context/store/slices/loader-slice';

interface IParseHTMLContent {
    id?: string;
    content: string;
}
const mergeFormulaTags = (html) => {
    return html.replace(
        /<p>\s*\\\[<\/p>\s*<p>(.*?)<\/p>\s*<p>\\\]<\/p>/gs,
        '<p>\\[$1\\]</p>'
    );
};
const ParseHTMLContent = ({ id, content }: IParseHTMLContent) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loaderActions.turnOff());
    }, [])

    const processedContent = mergeFormulaTags(content);

    return (
        <div id={id} className='w-full content-display'>
            <MathJaxContext>
                <MathJax>
                    {parse(processedContent)}
                </MathJax>
            </MathJaxContext>
        </div>
    )
}

export default ParseHTMLContent;