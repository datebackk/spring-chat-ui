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