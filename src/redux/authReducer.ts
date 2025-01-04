import {Dispatch} from "redux";
import {authAPI} from "../api/api.ts";
import {AppThunk} from "./redux-store.ts";

const SET_USERS_DATA = 'SET_USERS_DATA';
const EXIT_USERS_DATA = 'EXIT_USERS_DATA';
const LOGIN_USERS_DATA = 'LOGIN_USERS_DATA';

const initialState = {
    id: 0,
    email: '',
    login: '',
    isAuth: false
}

type InitialState = typeof initialState

export const authReducer = (state: InitialState = initialState, action: Action): InitialState => {
    switch (action.type) {
        case SET_USERS_DATA: {
            return {...state, isAuth: true, ...action.payload};
        }
        case EXIT_USERS_DATA: {
            return {...state, isAuth: false};
        }
        case LOGIN_USERS_DATA: {
            return {...state, ...action.payload};
        }
        default:
            return state
    }
}

export const setAuthUsersAC = (payload: {id: number, email: string, login: string}) => {
    return {type: SET_USERS_DATA, payload} as const
}

export const loginAuthUsersAC = (payload: {email: string, password: string, rememberMe: boolean}) => {
    return {type: LOGIN_USERS_DATA, payload} as const
}

export const exitAuthUsersAC = () => {
    return {type: EXIT_USERS_DATA} as const
}

export const setAuthUsersTC = (): AppThunk => (dispatch: Dispatch) =>{
    authAPI.getMe().then(res => {
            if (res.resultCode === 0) {
                dispatch(setAuthUsersAC(res.data));
            }
        }
    )
}

export const exitAuthUsersTC = (): AppThunk => (dispatch: Dispatch) =>{
    authAPI.exitMe().then( ()=> {
                dispatch(exitAuthUsersAC());
        }
    )
}

export const loginAuthUsersTC = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch: Dispatch) =>{
    authAPI.loginMe(email, password, rememberMe).then( ()=> {
                dispatch(loginAuthUsersAC({email, password, rememberMe}));
        }
    )
}

type UsersAction =  ReturnType< typeof setAuthUsersAC>
type ExitUsersAction =  ReturnType< typeof exitAuthUsersAC>
type LoginUsersAction =  ReturnType< typeof loginAuthUsersAC>
type Action =UsersAction | ExitUsersAction | LoginUsersAction

// export const loginAuthUsersTC = (
//     email: string,
//     password: string,
//     rememberMe: boolean
// ) => {
//     return async (dispatch: Dispatch) => {
//         try {
//             const response = await authAPI.loginMe(email, password, rememberMe);
//             if (response.resultCode === 0) {
//                 dispatch(loginAuthUsersAC({ email, password, rememberMe }));
//             } else {
//                 throw new Error(response.messages[0] || 'Login failed');
//             }
//         } catch (error) {
//             console.error('Error during login:', error);
//             throw error;
//         }
//     };
// };
//
// export const setAuthUsersTC = () => {
//     return async (dispatch: Dispatch) => {
//         try {
//             const response = await authAPI.getMe();
//             if (response.resultCode === 0) {
//                 dispatch(setAuthUsersAC(response.data));
//             } else {
//                 throw new Error(response.messages[0] || 'Failed to fetch auth data');
//             }
//         } catch (error) {
//             console.error('Error fetching auth data:', error);
//             throw error;
//         }
//     };
// };
//
// export const exitAuthUsersTC = () => {
//     return async (dispatch: Dispatch) => {
//         try {
//             const response = await authAPI.exitMe();
//             if (response.resultCode === 0) {
//                 dispatch(exitAuthUsersAC());
//             } else {
//                 throw new Error(response.messages[0] || 'Failed to exit');
//             }
//         } catch (error) {
//             console.error('Error during exit:', error);
//             throw error;
//         }
//     };
// };
