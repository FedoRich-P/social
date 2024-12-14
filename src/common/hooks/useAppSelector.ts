import {useSelector} from "react-redux";
import {RootState} from "../../redux/redux-store.ts";

export const useAppSelector = useSelector.withTypes<RootState>()