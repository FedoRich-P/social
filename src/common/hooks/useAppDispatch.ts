import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/redux-store.ts";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()