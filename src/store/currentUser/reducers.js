import {SET_USER, setUser} from "./actions";
import {getCurrentUser} from "../../util/userUtil";

const defaultState = {};


export const fetchUser = () => {
    return (dispatch) => {
        getCurrentUser()
            .then((response) => {
                dispatch(setUser(response));
            })
            .catch((error) => {
                console.log(error);
            });
    }
}


export const currentUserReducer = (state = defaultState, action) => {
    switch (action.type) {

        case SET_USER:
            return action.payload

        default:
            return state;
    }
}