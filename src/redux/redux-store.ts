import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction} from "redux";
import {profileReducer} from "./profileReducer";
import {dialogsReducer} from "./dialogsReducer";
import {UsersAction, usersReducer} from "./usersReducer";
import {authReducer} from "./authReducer.ts";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";

export const reducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    users: usersReducer,
    auth: authReducer,
})

export const store = legacy_createStore(reducers, {}, applyMiddleware(thunk));

export type ReduxState = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;
export type AppThunk = ThunkAction<void, RootState, unknown, UsersAction>;

