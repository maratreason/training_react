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
        return instance.get(`/users?page=${currentPage}&count=${pageSize}`);
    },
    follow(userId) {
        return instance.post(`/follow/${userId}`);
    },
    unfollow(userId) {
        return instance.delete(`/follow/${userId}`);
    }
}

export const ProfileAPI = {
    getProfile(userId) {
        return instance.get(`/profile/${userId}`);
    },
    getStatus(userId) {
        return instance.get(`/profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`/profile/status`, {
            status: status
        });
    },
    savePhoto(photoFile) {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`/profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },
    saveProfile(profile) {
        return instance.put("/profile", profile);
    }
}

export const AuthAPI = {
    me() { return instance.get(`/auth/me`); },
    login(email, password, rememberMe = false, captcha = null) { return instance.post("/auth/login", { email, password, rememberMe, captcha }); },
    logout() { return instance.delete("/auth/login"); }
}

export const SecurityAPI = {
    getCaptchaUrl() {
        return instance.get("/security/get-captcha-url");
    }
}