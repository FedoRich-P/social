import {RootState} from "../redux/redux-store.ts";


export const selectProfile = (state: RootState) => state.profile
export const selectDialogs = (state: RootState) => state.dialogs
export const selectUsers = (state: RootState) => state.users
export const selectAuth = (state: RootState) => state.auth
