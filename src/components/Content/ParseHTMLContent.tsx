"use client";
import { useAppDispatch } from '@/src/context/store/hooks';
import { modalActions } from '@/src/context/store/slices/modal-slice';
import { ModalName } from '@/utils/enums/ModalEnum';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';
import { H1, H2, H3 } from '../CustomStyle/Headers';

interface IParseHTMLContent
{
    id?: string;
    title?: string;
    content: string;
    isLocked: boolean;
}

const ParseHTMLContent = ({ id, title, content, isLocked }: IParseHTMLContent) =>
{
    const dispatch = useAppDispatch();

    const openLoginModal = () =>
    {
        dispatch(modalActions.updateModalType(ModalName.Login))
    }

    if (isLocked)
    {
        return (
            <div className='w-full py-1 cursor-pointer' onClick={openLoginModal}>
                <h1 className='text-xl text-gray-700 font-semibold'>{title}</h1>
                <div className="w-full h-[400px] bg-white flex flex-col justify-center items-center rounded-lg border-2 border-sky-900 relative overflow-hidden">
                    <div className="z-10 flex flex-col justify-center items-center text-sky-900">
                        <FontAwesomeIcon icon={faLock} className="lg:text-6xl md:text-4xl sm:text-2xl text-xl border-2 border-sky-900 rounded-full px-2 py-1 md:px-8 md:py-6" />
                        <p className="w-full lg:text-2xl md:text-xl sm:text-lg text-md my-4">
                            Sign In to View Content
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const getTextFromChildren = (children) => {
        if (!children) return '';

        if (Array.isArray(children)) {
            return children.map(child => {
                if (typeof child === 'string') {
                    return child; 
                } else if (child && child.type === 'text') {
                    return child.data; 
                }
                return null; 
            }).join(''); 
        }

        return '';
    };

    const options = {
        replace: (domNode) => {
            const textContent = getTextFromChildren(domNode.children);
            if (domNode.name === 'h1') {
                return <H1>{textContent}</H1>;
            }
            if (domNode.name === 'h2') {
                return <H2>{textContent}</H2>;
            }
            if (domNode.name === 'h3') {
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