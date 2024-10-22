import { Image } from "react-bootstrap";

type Props = {
  image: string;
  title: string;
  description?: string;
};

const ContentCard = (props: Props) => {
  return (
    <div className="max-w-sm bg-inherit overflow-hidden border-b-2 border-gray-300 cursor-pointer">
      <div className="w-full h-48 overflow-hidden">
        <Image
          src={props.image}
          alt={props.title}
          fluid
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-indigo-700 transition-colors duration-300">
          {props.title}
        </h3>
       {props.description && <p className="text-gray-600">{props.description}</p>}
      </div>
    </div>
  );
};

export default ContentCard;
