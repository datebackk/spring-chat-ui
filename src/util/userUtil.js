import {AUTH_SERVICE, CHAT_SERVICE, request} from "./request";
export const USER_IMG_PATH = CHAT_SERVICE + '/img/'

export function login(loginRequest) {
    return request({
        url: AUTH_SERVICE + "/users/signin",
        method: "POST",
        body: JSON.stringify(loginRequest),
    });
}

export function signup(signupRequest) {
    return request({
        url: AUTH_SERVICE + "/users/signup",
        method: "POST",
        body: JSON.stringify(signupRequest),
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem("accessToken")) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: AUTH_SERVICE + "/users/me",
        method: "GET",
    });
}


export function getUsers(nickname) {
    return request({
        url: CHAT_SERVICE + "/user/" + nickname,
        method: "GET",
    });
}


export function uploadUserImg(formData) {
    return request({
        url: CHAT_SERVICE + "/user/avatar",
        method: "POST",
        body: formData,
        headers: {'Content-Type': 'multipart/form-data'}
    });
}