"use client"
import { useAppDispatch } from "@/src/context/store/hooks";
import { modalActions } from "@/src/context/store/slices/modal-slice";
import { ISection } from "@/types/Content"
import { ModalName } from "@/utils/enums/ModalEnum";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarElement = ({ section, onClick }: { section: ISection, onClick: (id: string) => void }) =>
{

  const dispatch = useAppDispatch()

  const goToLogin = () =>
  {
    if (section.locked)
    {
      dispatch(modalActions.updateModalType(ModalName.AuthModal));
    }
    else
    {
      onClick(section.id!);
    }
  }

  return (
    <div
      className={`w-full cursor-pointer ${section.locked ? "text-sky-300" : "text-white"
        } text-lg flex py-2 my-2`}
      onClick={() => goToLogin()}
    >
      <div
        className={`me-2 text-gray-600 text-md ${section.locked ? "text-sky-300" : "text-white"
          } px-1`}
      >
        <FontAwesomeIcon icon={section.locked ? faLock : faUnlock} />
      </div>
      <div>{section.section}</div>
    </div>
  );
}

export default SidebarElement;