import React, {ChangeEvent} from 'react';
import type {ProfilePagePropsType} from "../../../../redux/store";
import {addNewPostAC, updateNewPostTextAC} from "../../../../redux/profileReducer";
import {MyPosts} from "../MyPosts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../../redux/redux-store";

type Props = {
};

export const MyPostsContainer = (props: Props) => {

    const state = useSelector<RootState, ProfilePagePropsType>(state => state.profile);
    const dispatch = useDispatch();

    const addPostFn = () => {
        dispatch(addNewPostAC())
    }
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(updateNewPostTextAC({text: e.currentTarget.value}))
        e.target.focus()
    }
    return (
        <MyPosts addPost={addPostFn} updateNewPostText={onPostChange} state={state}/>
    )

};
