import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppStore } from "./redux-store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppStore>();
