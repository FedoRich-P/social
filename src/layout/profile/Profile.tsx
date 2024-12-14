import {ProfileInfo} from "./profileInfo/ProfileInfo";
import {MyPostsContainer} from "./myPosts/post/MyPostsContainer";
import {useEffect} from "react";
import {getUserProfileTC} from "../../redux/profileReducer";
import {Navigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../common/hooks/useAppSelector.ts";
import {selectAuth, selectProfile} from "../../app/appSelectors.ts";

export const Profile = () => {
    const profile = useAppSelector(selectProfile).profile;
    const isAuth = useAppSelector(selectAuth).isAuth
    // const profile = useSelector<RootState, DomainUser>((state) => state.profile.profile);
    const dispatch = useAppDispatch()
    const params = useParams();

    useEffect(() => {
        const userId = params.id || '2';
        dispatch(getUserProfileTC({userId}))
    }, [params])

    const usersProfile = <ProfileInfo {...profile}/>

    if(!isAuth) return <Navigate to="/login"/>

    return (
        <>
            {usersProfile}
            <MyPostsContainer/>
        </>
    );
};

// usersApi.getProfile({userId: params.id || '2'}).then(res => {
//     if (res) {
//         dispatch(setUserProfileAC(res));
//     }
// })

// axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${params.id || '1111'}`).then(res => {
//     if (res.data) {
//         dispatch(setUserProfileAC(res.data));
//     }
// })