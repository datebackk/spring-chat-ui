import {SET_CHATS, SOFT_UPDATE, STRONG_UPDATE, UPDATE_CHATS} from "./actions";

let defaultState = [];

const setChats = chats => {
    defaultState = chats
    return defaultState.slice();
}

const strongUpdate = ({chat, message}) => {
    defaultState = defaultState.filter((item) => item.chatId !== chat.chatId);
    defaultState.unshift({...chat, lastMessage: {...message}, newMessages: chat.newMessages + 1});
    return defaultState.slice();
}

const softUpdate = ({chat, message}) => {
    defaultState = defaultState.filter((item) => item.chatId !== chat.chatId);
    defaultState.unshift({...chat, lastMessage: {...message}, newMessages: 0});
    return defaultState.slice();
}

export const chatsReducer = (state = defaultState, action) => {
    switch (action.type) {

        case SET_CHATS:
            return setChats(action.payload);

        case STRONG_UPDATE:
            return strongUpdate(action.payload);

        case SOFT_UPDATE:
            return softUpdate(action.payload);

        default:
            return state;
    }
}