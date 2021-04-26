import {CHAT_SERVICE, request} from "./request";

export function getUserChats() {
    if (!localStorage.getItem("accessToken")) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: CHAT_SERVICE + "/chats",
        method: "GET",
    });
}


export function getUserChat(email) {
    return request({
        url: CHAT_SERVICE + "/chats?amount=single&userEmail=" + email,
        method: "GET",
    });
}

export function createNewChat(chat) {
    return request({
        url: CHAT_SERVICE + "/chats",
        method: "POST",
        body: JSON.stringify(chat)
    });
}