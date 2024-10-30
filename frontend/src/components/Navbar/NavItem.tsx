import { useAppDispatch, useAppSelector } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { useNavigate } from "@/src/hooks/useNavigate";
import { ModalName } from "@/utils/enums/ModalEnum";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const ActiveNavItem = "text-sky-900 bg-gray-200 cursor-not-allowed font-bold text-md rounded-xl px-4 py-2 transition duration-300";
export const InactiveNavItem = "text-gray-100 bg-sky-900 hover:bg-sky-700 hover:scale-105 cursor-pointer font-bold text-md rounded-xl px-4 py-2 transition duration-300";

const NavbarItem = ({ url, children, opensModal, modalType, cached }: { url?: string, children: React.ReactNode, opensModal?: boolean, modalType?: ModalName, cached?: boolean }) =>
{
    const dispatch = useAppDispatch();
    const currentModal = useAppSelector((state) => state.modal.type);
    const pathname = usePathname();
    const navigate = useNavigate();
    const router = useRouter();
    const [active, setActive] = useState(false);

    const onClick = () =>
    {
        if (active)
        {
            return;
        }
        if (opensModal)
        {
            dispatch(modalActions.updateModalType(modalType!));
        }
        else
        {
            dispatch(loaderActions.turnOn());
            if (cached)
            {
                router.push(url!);
            }
            else
            {
                navigate(url!);
            }
        }
    }

    useEffect(() =>
    {
        if (opensModal)
        {
            if (currentModal === modalType)
            {
                setActive(true);
            }
        }
        else
        {
            if (pathname === url)
            {
                setActive(true);
            }
        }

        return () =>
        {
            setActive(false);
        }
    }, [pathname, currentModal]);

    return (
        <div
            onClick={onClick}
            className={active ? ActiveNavItem : InactiveNavItem}
        >
            {children}
        </div>
    )
}

export default NavbarItem;