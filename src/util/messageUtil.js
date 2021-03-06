import {CHAT_SERVICE, request} from "./request";

export function sendNewMessage(newMessage) {
    if (!localStorage.getItem("accessToken")) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: CHAT_SERVICE + "/message",
        method: "POST",
        body: JSON.stringify(newMessage),
    });
}

export function getChatMessages(chatId) {
    if (!localStorage.getItem("accessToken")) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: CHAT_SERVICE + "/message/" + chatId,
        method: "GET",
    });
}

export function countNewMessages(chatId) {
    return request({
        url: CHAT_SERVICE + "/new-messages/" + chatId,
        method: "GET",
    });
}

export function updateMessage(message) {
    return request({
        url: CHAT_SERVICE + "/message/",
        method: "PUT",
        body: JSON.stringify(message)
    });
}


export function getAdminMessages() {
    return request({
        url: CHAT_SERVICE + "/messages",
        method: "GET",
    });
}

export function updateAdminMessage(message) {
    return request({
        url: CHAT_SERVICE + "/messages/" + message.id,
        method: "PUT",
        body: JSON.stringify(message)
    });
}

export function deleteAdminMessage(message) {
    return request({
        url: CHAT_SERVICE + "/messages/" + message.id,
        method: "DELETE",
        body: JSON.stringify(message)
    });
}