import {Dispatch} from "redux";
import {authAPI} from "../api/api.ts";
import {AppDispatch, AppThunk} from "./redux-store.ts";

const SET_USERS_DATA = 'SET_USERS_DATA';
const LOGOUT_USERS_DATA = 'LOGOUT_USERS_DATA';
const LOGIN_USERS_DATA = 'LOGIN_USERS_DATA';
const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';

const initialState = {
    id: 0,
    email: '',
    login: '',
    isAuth: false,
    error: null as string | null
}

type InitialState = typeof initialState

export const authReducer = (state: InitialState = initialState, action: AuthAction): InitialState => {
    switch (action.type) {
        case SET_USERS_DATA: {
            return {...state, isAuth: true, ...action.payload};
        }
        case LOGOUT_USERS_DATA: {
            return { id: 0,
                email: '',
                login: '',
                isAuth: false};
        }
        case LOGIN_USERS_DATA: {
            return {...state, ...action.payload};
        }
        case SET_LOGIN_ERROR:
            return { ...state, error: action.payload };
        default:
            return state
    }
}

export const setUsersAC = (payload: { id: number, email: string, login: string }) => {
    return {type: SET_USERS_DATA, payload} as const
}

export const loginUsersAC = (payload: { email: string, password: string, rememberMe: boolean }) => {
    return {type: LOGIN_USERS_DATA, payload} as const
}

export const logoutUsersAC = () => {
    return {type: LOGOUT_USERS_DATA} as const
}

export const setLoginErrorAC = (error: string) => ({ type: SET_LOGIN_ERROR, payload: error }) as const;

export const setAuthUsersTC = (): AppThunk<Promise<void>> => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.getMe();
        if (res.resultCode === 0) {
            dispatch(setUsersAC(res.data));  // Записываем профиль в редьюсер
        }
    } catch (error) {
        console.error('Error in getMe:', error);
    }
}

export const logoutUsersTC = (): AppThunk<Promise<void>> => async (dispatch: Dispatch) => {
    try {
        await authAPI.logOut();
        dispatch(logoutUsersAC());
    } catch (error) {
        console.error("Ошибка при выходе:", error);
    }
}

export const loginUsersTC = (payload: { email: string; password: string; rememberMe: boolean }): AppThunk => async (dispatch: AppDispatch) => {
    try {
        const res = await authAPI.logIn(payload); // Асинхронный запрос для логина
        if (res.resultCode === 0) {
            await dispatch(setAuthUsersTC()); // Параллельно выполняем setAuthUsersTC
            dispatch(loginUsersAC(payload)); // Диспатчим успешный логин
        } else {
            dispatch(setLoginErrorAC('Неверный email или пароль')); // Ошибка при логине
        }
    } catch (error) {
        console.error('Ошибка:', error);
        dispatch(setLoginErrorAC('Произошла ошибка при попытке войти.')); // Ошибка сервера
    }
};

// export const loginUsersTC = (payload: {
//     email: string,
//     password: string,
//     rememberMe: boolean
// }): AppThunk<Promise<void>> => async (dispatch: AppDispatch) => {
//     try {
//         await authAPI.logIn(payload).then(res => {
//             console.log(res);
//         }).catch(error => {
//             console.log(error)});
//         await dispatch(setAuthUsersTC())
//         dispatch(loginUsersAC(payload));
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

type UsersAction = ReturnType<typeof setUsersAC>
type LogoutUsersAction = ReturnType<typeof logoutUsersAC>
type LoginUsersAction = ReturnType<typeof loginUsersAC>
export type AuthAction = UsersAction | LogoutUsersAction | LoginUsersAction