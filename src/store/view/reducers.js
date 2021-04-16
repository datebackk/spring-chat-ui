import {OPEN_DIALOG} from "./actions";

const defaultState = {
    details: {}
}

export const viewReducer = (state = defaultState, action) => {
    switch (action.type) {

        case OPEN_DIALOG:
            return {...state, details: action.payload};

        default:
            return state;
    }
}