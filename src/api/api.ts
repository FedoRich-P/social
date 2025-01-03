import {instance} from "./instance.ts";
import {Response} from "../layout/header/Header.tsx";

export const usersApi = {
    getUsers(payload: { currentPage: number, pageSize: number }) {
        const {currentPage = 1, pageSize = 10} = payload;
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data);
    },

    followUsers<T extends 'post' | 'delete'>(method: T, payload: { userId: number }) {
        const {userId = 1111} = payload;
        return instance[method](`follow/${userId}`, {}).then((response) => response.data);
    },

    unFollowUsers<T extends 'post' | 'delete'>(method: T, payload: { userId: number }) {
        const {userId = 1111} = payload;
        return instance[method](`follow/${userId}`).then((response) => response.data);
    },
}

export const authAPI = {
    getMe() {
        return instance
            .get<Response>('auth/me', {withCredentials: true})
            .then(res => res.data)
    },


}

export const profileApi = {
    getProfile(payload: { userId: string }) {
        const {userId = 2} = payload;
        return instance.get(`profile/${userId}`).then((response) => response.data);
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status})
    }
}

// type SeverStatus = {
//     resultCode: number
//     messages: [],
//     data: {}
// }


// axios.get<Response>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(res => {
//     if(res.data.resultCode === 0) {
//         dispatch(setAuthUsersAC(res.data.data));
//     }
// })