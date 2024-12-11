import { useAppDispatch } from "@/src/context/store/hooks";
import { loaderActions } from "@/src/context/store/slices/loader-slice";
import { useNavigate } from "@/src/hooks/useNavigate";
import { formatFirebaseDate } from "@/utils/helpers/DateFormatter";
import Image from "next/image";

type Props = {
  id: string;
  image: string;
  title: string;
  createdAt: Date;
  description?: string;
};

const ContentCard = (props: Props) =>
{

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNavigate = (id: string) =>
  {
    dispatch(loaderActions.turnOn());
    navigate(`/content/${id}`);
  }

  return (
    <div className="max-w-xs h-max 2xl:max-w-md bg-gray-50 shadow-md rounded-md overflow-hidden cursor-pointer" onClick={() => handleNavigate(props.id)}>
      <div className="w-full h-56 overflow-hidden bg-white">
        <Image
          src={props.image}
          alt={props.title}
          width={300}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-xs mb-1">{formatFirebaseDate(props.createdAt)}</p>
        {props.description && <p className="text-gray-500 text-sm mb-2">by {props.description}</p>}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-indigo-700 transition-colors duration-300">
          {props.title}
        </h3>

      </div>
    </div>
  );
};

export default ContentCard;
