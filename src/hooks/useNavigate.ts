import { useRouter } from "next/navigation";

export const useNavigate = () => {
  const router = useRouter();

  const navigate = (url: string) => {
    router.push(url);
    router.refresh();
  };

  return navigate;
};
