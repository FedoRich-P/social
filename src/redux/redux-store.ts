import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {ProfileAction, profileReducer} from "./profileReducer";
import {dialogsReducer, DialogsType} from "./dialogsReducer";
import {UsersAction, usersReducer} from "./usersReducer";
import {AuthAction, authReducer} from "./authReducer.ts";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";

export const reducers = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    users: usersReducer,
    auth: authReducer,
})

export const store = legacy_createStore(reducers, {}, applyMiddleware(thunk));

export type AppAction = ProfileAction | UsersAction | AuthAction | DialogsType
export type ReduxState = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppAction>;
// export type AppThunk = ThunkAction<void, RootState, unknown, ProfileAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    AppAction
>;

