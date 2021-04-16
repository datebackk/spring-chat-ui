import {SET_CHATS} from "./actions";

const defaultState = [];

export const chatsReducer = (state = defaultState, action) => {
    switch (action.type) {

        case SET_CHATS:
            return action.payload;

        default:
            return state;
    }
}