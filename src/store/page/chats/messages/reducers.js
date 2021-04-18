import {ADD_MESSAGE, SET_MESSAGES} from "./actions";

let defaultState = [];

const addMessage = message => {
    defaultState.push(message);
    return defaultState.slice();
}

const setMessages = messages => {
    defaultState = messages
    return defaultState.slice();
}

export const messagesReducer = (state = defaultState, action) => {
    switch (action.type) {

        case SET_MESSAGES:
            return setMessages(action.payload);

        case ADD_MESSAGE:
            return addMessage(action.payload)

        default:
            return state;
    }
}