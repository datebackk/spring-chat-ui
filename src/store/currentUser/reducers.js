import {SET_USER} from "./actions";

const defaultState = {};

export const currentUserReducer = (state = defaultState, action) => {
    switch (action.type) {

        case SET_USER:
            return action.payload

        default:
            return state;
    }
}