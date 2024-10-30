"use client";
import { useAppDispatch } from '@/src/context/store/hooks';
import { modalActions } from '@/src/context/store/slices/modal-slice';
import { ModalName } from '@/utils/enums/ModalEnum';
import parse from 'html-react-parser';

interface IContents
{
    title?: string;
    content: string;
    isLocked: boolean;
}

const Contents = ({ title, content, isLocked }: IContents) =>
{
    const dispatch = useAppDispatch();

    const openLoginModal = () =>
    {
        dispatch(modalActions.updateModalType(ModalName.Login))
    }

    if (isLocked)
    {
        return (
            <div>
                <h1>{title}</h1>
                <div className="blur-lg cursor-pointer" onClick={openLoginModal}>
                    {parse(content)}
                </div>
            </div>
        )
    }
    return parse(content);
}

export default Contents;