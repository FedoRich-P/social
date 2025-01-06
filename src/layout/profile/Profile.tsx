import { useEffect, useState } from "react";
import { useAppDispatch } from "../../common/hooks/useAppDispatch.ts";
import { useAppSelector } from "../../common/hooks/useAppSelector.ts";
import { getUserProfileTC, getProfileStatusTC, resetProfileAC } from "../../redux/profileReducer";
import { selectAuth, selectProfile } from "../../app/appSelectors.ts";
import { ProfileInfo } from "./profileInfo/ProfileInfo";
import { MyPosts } from "./myPosts/MyPosts.tsx";
import { Navigate, useParams } from "react-router-dom";

export const Profile = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const isAuth = useAppSelector(selectAuth).isAuth;
    const profile = useAppSelector(selectProfile).profile;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id || !isAuth) {
            dispatch(resetProfileAC());
            setLoading(false);
            return;
        }
        dispatch(getUserProfileTC({ userId: id }));
        dispatch(getProfileStatusTC({ userId: id }));
    }, [id, dispatch, isAuth]);

    useEffect(() => {
        if (profile) {
            setLoading(false);
        }
    }, [profile]);

    if (!isAuth) {
        return <Navigate to="/login" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ProfileInfo {...profile} />
            <MyPosts />
        </>
    );
};
