export const SET_STOMP_CLIENT = 'SET_STOMP_CLIENT';

export const setStompClient = stompClient => ({
    type: SET_STOMP_CLIENT,
    payload: stompClient
});