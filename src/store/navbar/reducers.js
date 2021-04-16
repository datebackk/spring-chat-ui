import {CHANGE_ACTIVE_TAB} from "./actions";

const defaultState = {
    users: {name: "users", isActive: false},
    chats: {name: "chats", isActive: true},
    users_add: {name: "users_add", isActive: false}
};

const switchTab = tabName => {
    for (const key in defaultState) {
        if (defaultState[key].isActive || tabName === key) {
            defaultState[key].isActive = !defaultState[key].isActive;
        }
    }
    return {...defaultState};
}

export const navbarReducer = (state = defaultState, action) => {
    switch (action.type) {

        case CHANGE_ACTIVE_TAB:
            return switchTab(action.payload);

        default:
            return state;
    }
}