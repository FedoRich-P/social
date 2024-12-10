import {instance} from "./instance.ts";

export const usersApi = {
    getUsers(payload: { currentPage: number, pageSize: number }){
        const {currentPage = 1, pageSize = 10} = payload;
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => response.data);
    },

    followUsers<T extends 'post' | 'delete'> (method: T, payload: { userId: number }) {
        const {userId = 1111} = payload;
        return instance[method](`follow/${userId}`, {}).then((response) => response.data);
    },

    unFollowUsers<T extends 'post' | 'delete'> (method: T, payload: { userId: number }) {
        const {userId = 1111} = payload;
        return instance[method](`follow/${userId}`).then((response) => response.data);
    }
}