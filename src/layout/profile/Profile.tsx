import {ProfileInfo} from "./profileInfo/ProfileInfo";
import {MyPostsContainer} from "./myPosts/post/MyPostsContainer";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../redux/redux-store";
import {useEffect} from "react";
import axios from "axios";
import {DomainUser, setUserProfileAC} from "../../redux/profileReducer";
import {useParams} from "react-router-dom";

export const Profile = () => {
    const profile = useSelector<RootState, DomainUser>((state) => state.profile.profile);
    const dispatch = useDispatch()
    const params = useParams();

    useEffect(() => {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${params.id || '1111'}`).then(res => {
            if (res.data) {
                dispatch(setUserProfileAC(res.data));
            }
        })
    }, [params])

    const usersProfile = <ProfileInfo {...profile}/>
    return (
        <>
            {usersProfile}
            <MyPostsContainer/>
        </>
    );
};