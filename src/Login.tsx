import {useSelector} from "react-redux";
import {RootState} from "./redux/redux-store.ts";

export const Login = () => {

    const myProfile = useSelector((state: RootState) => state.auth);
    return (
        <div>
            {myProfile.email}
            {myProfile.login}
        </div>
    );
};