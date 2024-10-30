"use client";
import { useAppDispatch } from '@/src/context/store/hooks';
import { modalActions } from '@/src/context/store/slices/modal-slice';
import { ModalName } from '@/utils/enums/ModalEnum';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import parse from 'html-react-parser';

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
            <div className='w-full  cursor-pointer' onClick={openLoginModal}>
                <h1>{title}</h1>
                <div className="w-full h-[400px] bg-gray-200 flex flex-col justify-center items-center rounded-lg border-2 border-sky-900 relative overflow-hidden">
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
    return (
        <div id={id} className='w-full'>
            {parse(content)}
        </div>
    )
}

export default ParseHTMLContent;