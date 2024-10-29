"use client";
import { useAppDispatch } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ModalName } from "@/utils/enums/ModalEnum";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Sidebar = ({ sections }: { sections: { section: string, locked: boolean }[] }) =>
{

    const dispatch = useAppDispatch();

    const openModal = (locked: boolean) =>
    {
        if (locked)
        {
            dispatch(modalActions.updateModalType(ModalName.Login));
        }
    }

    return (
        <div className="w-1/4 h-screen bg-sky-900 flex flex-col flex-grow px-4 py-2">
            {sections.map((section, index) => (
                <div key={index} className={`${section.locked ? "text-yellow-600 cursor-pointer" : "text-white"} text-lg flex mx-2 my-2 px-2 py-2`} onClick={() => openModal(section.locked)}>
                    <div className={`me-2 border-2 border-${section.locked ? "yellow-600" : "white"} rounded-full px-1`}>
                        <FontAwesomeIcon icon={section.locked ? faLock : faUnlock} />
                    </div>
                    <div>
                        {section.section}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Sidebar;