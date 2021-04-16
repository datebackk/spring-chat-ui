import {SET_MESSAGES} from "./actions";

const defaultState = [];

export const messagesReducer = (state = defaultState, action) => {
    switch (action.type) {

        case SET_MESSAGES:
            return action.payload;

        default:
            return state;
    }
}