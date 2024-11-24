/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import parse from 'html-react-parser';
import { useEffect } from 'react';
import { useAppDispatch } from '@/src/context/store/hooks';
import { loaderActions } from '@/src/context/store/slices/loader-slice';

interface IParseHTMLContent {
    id?: string;
    content: string;
}

const ParseHTMLContent = ({ id, content }: IParseHTMLContent) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(loaderActions.turnOff());
    }, [])

    return (
        <div id={id} className='w-full content-display'>
            {parse(content)}
        </div>
    )
}

export default ParseHTMLContent;