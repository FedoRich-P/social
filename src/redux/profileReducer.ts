import {v1} from "uuid";
import {ProfilePagePropsType} from "./store";
import {Dispatch} from "redux";
import {profileApi} from "../api/api.ts";
import {AppThunk} from "./redux-store.ts";

const src = 'https://yt3.googleusercontent.com/gNPWe_Z8GKUvjGzTvGSbqvpwUMEfUFtozENoQgyQnxuFuF3fe5bq5tsWm8o0QuwMaeb2ICycHQ=s900-c-k-c0x00ffffff-no-rj'

const ADD_NEW_POST = 'ADD_NEW_POST'
const GET_PROFILE_STATUS = 'GET_PROFILE_STATUS'
const UPDATE_PROFILE_STATUS = 'UPDATE_PROFILE_STATUS'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const RESET_PROFILE = 'RESET_PROFILE';

const initialState: ProfilePagePropsType = {
    postData: [
        {
            id: v1(),
            src: 'https://yt3.googleusercontent.com/gNPWe_Z8GKUvjGzTvGSbqvpwUMEfUFtozENoQgyQnxuFuF3fe5bq5tsWm8o0QuwMaeb2ICycHQ=s900-c-k-c0x00ffffff-no-rj',
            text: 'First comment : Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, odio.',
            likes: 50,
        },
        {
            id: v1(),
            src: 'https://yt3.googleusercontent.com/gNPWe_Z8GKUvjGzTvGSbqvpwUMEfUFtozENoQgyQnxuFuF3fe5bq5tsWm8o0QuwMaeb2ICycHQ=s900-c-k-c0x00ffffff-no-rj',
            text: 'Second comment: Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, odio.',
            likes: 100,
        }
    ],
    profile: '',
    status: ''

}

type InitialState = typeof initialState

export const profileReducer = (state = initialState, action: ProfileAction): InitialState => {
    switch (action.type) {
        case ADD_NEW_POST: {
            return {
                ...state,
                postData: [{
                    id: v1(),
                    src: src,
                    likes: 0,
                    text: action.payload.text,
                },
                    ...state.postData
                ],
            }
        }
        case GET_PROFILE_STATUS: {
            return {...state, status: action.payload.status}
        }
        case SET_USER_PROFILE: {
            return {...state, profile: {...state.profile, ...action.payload}}
        }
        case RESET_PROFILE: {
            return { ...state, profile: '', status: '' };
        }
        default:
            return state
    }
}

export const addNewPostAC = (payload: { text: string }) => {
    return {type: ADD_NEW_POST, payload} as const
}
export const setUserProfileAC = (payload: { profile: DomainUser }) => {
    return {type: SET_USER_PROFILE, payload} as const
}
export const updateProfileStatusAC = (payload: { status: string }) => {
    return {type: UPDATE_PROFILE_STATUS, payload} as const
}
export const getProfileStatusAC = (payload: { status: string }) => {
    return {type: GET_PROFILE_STATUS, payload} as const
}
export const resetProfileAC = () => ({ type: RESET_PROFILE }) as const
;
export const getUserProfileTC = (payload: { userId: string }): AppThunk => (dispatch: Dispatch) => {
    const {userId} = payload
    if (!userId) {
        console.error('User ID is required');
        return;
    }
    try {
        profileApi.getProfile({userId}).then(res => {
            if (res) {
                dispatch(setUserProfileAC(res));
            }
        })
    } catch (error) {
        console.log(error)
    }
}
export const getProfileStatusTC = (payload: { userId: string }): AppThunk => (dispatch: Dispatch) => {
    const {userId} = payload
    if (!userId) {
        console.error('User ID is required for fetching profile status');
        return;
    }
    try {
        profileApi.getStatus(userId).then(res => {
            if (res.data) {
                dispatch(getProfileStatusAC({status: res.data}));
            } else {
                dispatch(getProfileStatusAC({status: ''}));
            }
        })
    } catch (error) {
        console.log(error)
    }
}
export const UpdateProfileStatusTC = (payload: { status: string }): AppThunk => (dispatch: Dispatch) => {
    const {status} = payload
    profileApi.updateStatus(status).then(() => {
        dispatch(updateProfileStatusAC({status}));
    })
}
export const AddNewPosTC = (payload: { text: string }): AppThunk => (dispatch: Dispatch) => {
    const {text} = payload
    dispatch(addNewPostAC({text}));
}

export type DomainUser = {
    userId: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    status: string
    contacts: {
        github: string
        vk: string
        facebook: string
        instagram: string
        twitter: string
        website: string
        youtube: string
        mainLink: string
    }
    photos: {
        small: string
        large: string
    }

}

export type AddNewPostType = ReturnType<typeof addNewPostAC>
export type SetUserProfileACType = ReturnType<typeof setUserProfileAC>
export type UpdateProfileStatus = ReturnType<typeof updateProfileStatusAC>
export type GetProfileStatus = ReturnType<typeof getProfileStatusAC>
export type ResetProfileStatus = ReturnType<typeof resetProfileAC>

export type ProfileAction =
    AddNewPostType
    | SetUserProfileACType
    | UpdateProfileStatus
    | GetProfileStatus
    |ResetProfileStatus