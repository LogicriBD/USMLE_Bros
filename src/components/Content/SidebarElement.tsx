"use client"
import { useAppDispatch } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ISection } from "@/types/Content"
import { ModalName } from "@/utils/enums/ModalEnum";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarElement = ({ section, onClick }: { section: ISection, onClick: (id: string) => void }) =>
{

  const dispatch = useAppDispatch();

  const openModal = () =>
  {
    if (section.locked)
    {
      dispatch(modalActions.updateModalType(ModalName.Login));
    }
    else
    {
      onClick(section.id!);
    }
  }

  return (
    <div
      className={`w-screen cursor-pointer ${section.locked ? "text-yellow-600" : "text-white"
        } text-lg flex py-2 my-2`}
      onClick={() => openModal()}
    >
      <div
        className={`me-2 text-gray-600 text-md px-1`}
      >
        <FontAwesomeIcon icon={section.locked ? faLock : faUnlock} />
      </div>
      <div className="text-gray-600">{section.section}</div>
    </div>
  );
}

export default SidebarElement;