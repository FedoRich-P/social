import {useAppSelector} from "./common/hooks/useAppSelector.ts";
import {selectAuth} from "./app/appSelectors.ts";

export const Login = () => {

    const myProfile = useAppSelector(selectAuth);
    // const myProfile = useSelector((state: RootState) => state.auth);

    return (
        <div>
            {myProfile.email}
            {myProfile.login}
        </div>
    );
};