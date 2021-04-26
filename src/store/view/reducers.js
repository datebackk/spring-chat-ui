import {CREATE_DIALOG, OPEN_DIALOG} from "./actions";

const defaultState = {
    details: {},
    action: "UPDATE"
}

export const viewReducer = (state = defaultState, action) => {
    switch (action.type) {

        case OPEN_DIALOG:
            return {...defaultState, details: action.payload, action: "UPDATE"};

        case CREATE_DIALOG:
            return {...defaultState, details: action.payload, action: "CREATE"}

        default:
            return state;
    }
}