/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { useNavigate } from "@/src/hooks/useNavigate";
import { ModalName } from "@/utils/enums/ModalEnum";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ActiveNavItem = "text-white px-4 py-2 tablet:text-md text-sm border border-white rounded-lg font-bold cursor-not-allowed";
export const InactiveNavItem = "text-white px-4 py-2 tablet:text-md text-sm font-bold cursor-pointer hover:underline";

export const ActiveModalItem = "text-sky-400 bg-gray-200 cursor-not-allowed font-bold tablet:text-md text-sm rounded-xl px-4 py-2 transition duration-300";
export const InactiveModalItem = "text-white bg-sky-400 hover:bg-sky-500 hover:scale-105 cursor-pointer font-bold tablet:text-md text-sm rounded-xl px-4 py-2 transition duration-300";

const NavbarItem = ({ url, children, cached, isButton, opensModal, modalType }: { url?: string, children: React.ReactNode, opensModal?: boolean, modalType?: ModalName, cached?: boolean, isButton?: boolean }) =>
{
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const navigate = useNavigate();
    const router = useRouter();
    const [active, setActive] = useState(false);
    const [className, setClassName] = useState<string>("");

    const onClick = () =>
    {
        if (active)
        {
            return;
        }
        dispatch(loaderActions.turnOn());
        if (opensModal)
        {
            if (!modalType)
            {
                throw Error("Modal type is required when opening a modal");
            }
            dispatch(modalActions.updateModalType(modalType))
            return;
        }
        if (!url)
        {
            throw Error("URL is required when navigating");
        }
        if (cached)
        {
            router.push(url!);
        }
        else
        {
            navigate(url!);
        }
    }

    useEffect(() =>
    {
        if (pathname===url)
        {
            setClassName(isButton ? ActiveModalItem : ActiveNavItem);
            setActive(true);
        }
        else
        {
            setClassName(isButton ? InactiveModalItem : InactiveNavItem);
            setActive(false);
        }

        return () =>
        {
            setActive(false);
            dispatch(loaderActions.turnOff())
        }
    }, [pathname, url]);

    return (
        <div
            onClick={onClick}
            className={className}
        >
            {children}
        </div>
    )
}

export default NavbarItem;