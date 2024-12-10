import {Dispatch} from "redux";
import {usersApi} from "../api/api.ts";
import {AppThunk} from "./redux-store.ts";

export type UserFromData = {
    name: string
    id: number
    photos: Photos
    status: any
    followed: boolean
}

export type Photos = {
    small: any
    large: any
}

const initialState = {
    users: <UserFromData[]>[],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: true,
}

type InitialState = typeof initialState

export const usersReducer = (state: InitialState = initialState, action: UsersAction): InitialState => {
    switch (action.type) {
        case 'FOLLOW':
        case 'UNFOLLOW': {
            const {userId, isFollowed} = action.payload;
            return {...state, users: state.users.map(user => user.id === +userId ? {...user, followed: isFollowed} : user)};
        }
        case 'SET_USERS': {
            return {...state, users: action.payload.users};
        }
        case 'SET_CURRENT_PAGE': {
            return {...state, currentPage: action.payload.currentPage};
        }
        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalCount: action.payload.totalCount};
        }
        case 'TOGGLE_FETCHING': {
            return {...state, isFetching: action.payload.isFetching};
        }
        default:
            return state
    }
}

export const followAC = (payload: {userId: number, isFollowed: boolean}) => {
    return {type: 'FOLLOW', payload} as const
}
export const unFollowAC = (payload: {userId: number, isFollowed: boolean}) => {
    return {type: 'UNFOLLOW', payload} as const
}
export const setUsersAC = (payload: {users: UserFromData[]}) => {
    return {type: 'SET_USERS', payload} as const
}

export const setCurrentPageAC = (payload: {currentPage: number}) => {
    return {type: 'SET_CURRENT_PAGE', payload} as const
}

export const setTotalUsersCountAC = (payload: {totalCount: number}) => {
    return {type: 'SET_TOTAL_USERS_COUNT', payload} as const
}

export const toggleFetchingAC = (payload: {isFetching: boolean}) => {
    return {type: 'TOGGLE_FETCHING', payload} as const
}

export const FollowTC =(payload: {userId: number}):AppThunk => (dispatch: Dispatch) => {
    const {userId} = payload
    usersApi.followUsers('post',{ userId}).then(res => {
        if (res.resultCode === 0) {
            dispatch(followAC({userId, isFollowed: true}));
        }
    })
}

export const UnFollowTC =(payload: {userId: number}):AppThunk => (dispatch: Dispatch) => {
    const {userId} = payload
    usersApi.unFollowUsers('delete',{ userId}).then(res => {
        if (res.resultCode === 0) {
            dispatch(unFollowAC({userId, isFollowed: false}))
        }
    })
}

export const FetchTC =(payload: {currentPage: number, pageSize: number}): AppThunk => (dispatch: Dispatch) => {
    const {currentPage, pageSize} = payload;
    usersApi.getUsers({currentPage, pageSize}).then(res => {
        if (res.items) {
            dispatch(setUsersAC({users: res.items}))
            dispatch(setTotalUsersCountAC({totalCount: res.totalCount}))
            dispatch(toggleFetchingAC({isFetching: false}))
        } else {
            dispatch(toggleFetchingAC({isFetching: true}))
        }
    })
}


export type FollowACType = ReturnType<typeof followAC>
export type UnFollowACType = ReturnType<typeof unFollowAC>
export type SetUsersACType = ReturnType<typeof setUsersAC>
export type SetCurrentPageACType = ReturnType<typeof setCurrentPageAC>
export type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCountAC>
export type ToggleFetchingACACType = ReturnType<typeof toggleFetchingAC>

export type UsersAction = FollowACType | UnFollowACType | SetUsersACType | SetCurrentPageACType | SetTotalUsersCountACType | ToggleFetchingACACType