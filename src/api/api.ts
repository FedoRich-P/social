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
    getMe() {
        return instance
            .get<APIResponse<MeResponse>>('auth/me')
            .then(res => res.data)
    },
    loginMe(email: string, password: string, rememberMe: boolean) {
        return instance
            .post<APIResponse<LoginResponse>>('auth/login', {
                email, password, rememberMe
            })
            .then(res => res.data)
    },
    exitMe() {
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
        return instance.put(`profile/status`, {status})
    }
}

// type SeverStatus = {
//     resultCode: number
//     messages: [],
//     data: {}
// }

// type Login = {
//     email: string,
//     password: string,
//     rememberMe: boolean,
// }

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
// email: required(string)
// valid confirmed user email address, which used during registration
//
// password: required(string)
// valid user password
//
// rememberMe: (boolean)
// if true, then session will not be expired after session finishing


// axios.get<Response>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}).then(res => {
//     if(res.data.resultCode === 0) {
//         dispatch(setAuthUsersAC(res.data.data));
//     }
// })