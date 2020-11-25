import * as Axios from "axios";

const instance = Axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0",
    headers: {
        "API-KEY": "2cca6603-6583-48e8-b824-aef845687246"
    }
});

export const UsersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`).then(response => response.data);
    },
    getProfile(userId) {
        return instance.get(`/profile/${userId}`).then(response => response.data);
    },
    follow(userId) {
        return instance.post(`/follow/${userId}`).then(response => response.data);
    },
    unfollow(userId) {
        return instance.delete(`/follow/${userId}`).then(response => response.data);
    }
}

export const AuthAPI = {
    me() {
        return instance.get(`/auth/me`).then(response => response.data);
    }
}