import {ADD_MESSAGE, SET_MESSAGES, UPDATE_MESSAGE_STATUS} from "./actions";

let defaultState = [];

const addMessage = message => {
    defaultState.push(message);
    return defaultState.slice();
}

const setMessages = messages => {
    defaultState = messages
    return defaultState.slice();
}

const updateMessageStatus = message => {
    defaultState = defaultState.map((item) => item.id === message.id ? {...item, status: "READ"} : {...item});
    return defaultState.slice();
}

export const messagesReducer = (state = defaultState, action) => {
    switch (action.type) {

        case SET_MESSAGES:
            return setMessages(action.payload);

        case ADD_MESSAGE:
            return addMessage(action.payload);

        case UPDATE_MESSAGE_STATUS:
            return updateMessageStatus(action.payload);

        default:
            return state;
    }
}