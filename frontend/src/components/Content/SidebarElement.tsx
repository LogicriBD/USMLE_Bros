"use client"
import { useAppDispatch } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ISection } from "@/types/Content"
import { ModalName } from "@/utils/enums/ModalEnum";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarElement = ({ section }: { section: ISection }) =>
{

  const dispatch = useAppDispatch();

  const openModal = () =>
  {
    if (section.locked)
    {
      dispatch(modalActions.updateModalType(ModalName.Login));
    }
  }

  return (
    <div
      className={`${section.locked ? "text-yellow-600 cursor-pointer" : "text-white"
        } text-lg flex mx-2 my-2 px-2 py-2`}
      onClick={() => openModal()}
    >
      <div
        className={`me-2 border-2 ${section.locked ? "border-yellow-600" : "border-white"
          } rounded-full px-1`}
      >
        <FontAwesomeIcon icon={section.locked ? faLock : faUnlock} />
      </div>
      <div>{section.section}</div>
    </div>
  );
}

export default SidebarElement;