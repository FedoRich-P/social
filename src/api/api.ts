import {instance} from "./instance.ts";

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
    async getMe() {
        const res = await instance
            .get<APIResponse<MeResponse>>('auth/me');
        return res.data;
    },
    async logIn(payload: { email: string, password: string, rememberMe: boolean }) {
        const res = await instance
            .post<APIResponse<LoginResponse>>('auth/login', {
                ...payload,
            });
        return res.data;
    },
    logOut() {
        return instance
            .delete<APIResponse>('auth/login')
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
        return instance.put('profile/status', {status})
    }
}

type APIResponse<T = {}> = {
    resultCode: number;
    messages: string[];
    data: T;
};

type MeResponse = {
    id: number;
    email: string;
    login: string;
};

type LoginResponse = {
    userId: number;
};
