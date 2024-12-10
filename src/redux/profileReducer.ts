import {v1} from "uuid";
import {ProfilePagePropsType} from "./store";

const src = 'https://yt3.googleusercontent.com/gNPWe_Z8GKUvjGzTvGSbqvpwUMEfUFtozENoQgyQnxuFuF3fe5bq5tsWm8o0QuwMaeb2ICycHQ=s900-c-k-c0x00ffffff-no-rj'

const ADD_NEW_POST = 'ADD_NEW_POST'
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT'

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
    newPostText: '',
    profile: {}

}

type InitialState = typeof initialState

export const profileReducer = (state = initialState, action: Action): InitialState => {
    switch (action.type) {
        case ADD_NEW_POST: {
            return {
                ...state,
                postData: [{
                    id: v1(),
                    src: src,
                    likes: 0,
                    text: state.newPostText
                },
                    ...state.postData
                ],
                newPostText: '',
            }
        }
        case UPDATE_NEW_POST_TEXT: {
            return {...state, newPostText: action.payload.text}
        }
        case 'SET_USER_PROFILE': {
            return {...state, profile: {...action.payload}}
        }
        default:
            return state
    }
}

export type AddNewPostType = ReturnType<typeof addNewPostAC>
export type UpdateNewPostTextType = ReturnType<typeof updateNewPostTextAC>
export type SetUserProfileACType = ReturnType<typeof setUserProfileAC>

type Action = AddNewPostType | UpdateNewPostTextType | SetUserProfileACType

export const addNewPostAC = () => {
    return {type: ADD_NEW_POST} as const
}
export const setUserProfileAC = (payload: { profile: DomainUser }) => {
    return {type: 'SET_USER_PROFILE', payload} as const
}

export const updateNewPostTextAC = (payload: { text: string }) => {
    return {type: UPDATE_NEW_POST_TEXT, payload} as const
}

export type DomainUser = {
    userId: string
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
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
