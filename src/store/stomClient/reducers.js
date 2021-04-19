import {SET_STOMP_CLIENT, setStompClient} from "./actions";


const defaultState = {};

export const newStompclient = (stompClient) => {
    return (dispatch) => {
        dispatch(setStompClient(stompClient))
}}


export const stompClientReducer = (state = defaultState, action) => {
    switch (action.type) {

        case SET_STOMP_CLIENT:
            return action.payload

        default:
            return state;
    }
}