import {Dispatch} from "redux";
import {authAPI} from "../api/api.ts";

const SET_USERS_DATA = 'SET_USERS_DATA';

const initialState = {
    id: 0,
    email: '',
    login: '',
    isAuth: false
}

type InitialState = typeof initialState

export const authReducer = (state: InitialState = initialState, action: UsersAction): InitialState => {
    switch (action.type) {
        case SET_USERS_DATA: {
            // const {id, email, login} = action.payload;
            return {...state, isAuth: true, ...action.payload};
        }
        default:
            return state
    }
}

export const setAuthUsersAC = (payload: {id: number, email: string, login: string}) => {
    return {type: SET_USERS_DATA, payload} as const
}

export const setAuthUsersTC = () => (dispatch: Dispatch) =>{
    authAPI.getMe().then(res => {
            if (res.resultCode === 0) {
                dispatch(setAuthUsersAC(res.data));
            }
        }
    )
}

type UsersAction =  ReturnType< typeof setAuthUsersAC>
