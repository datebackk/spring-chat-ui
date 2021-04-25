import {SET_CHATS, UPDATE_CHATS} from "./actions";

let defaultState = [];

const setChats = chats => {
    defaultState = chats
    return defaultState.slice();
}

const updateChats = chat => {
    defaultState = defaultState.filter((item) => item.chatId !== chat.chatId);
    defaultState.unshift({...chat, newMessages: chat.newMessages++});
    return defaultState.slice();
}

export const chatsReducer = (state = defaultState, action) => {
    switch (action.type) {

        case SET_CHATS:
            return setChats(action.payload);

        case UPDATE_CHATS:
            return updateChats(action.payload);

        default:
            return state;
    }
}