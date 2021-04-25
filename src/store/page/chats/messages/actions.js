export const SET_MESSAGES = 'SET_MESSAGES';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const UPDATE_MESSAGE_STATUS = 'UPDATE_MESSAGE_STATUS'

export const setMessages = messages => ({
    type: SET_MESSAGES,
    payload: messages
});

export const addMessage = message => ({
    type: ADD_MESSAGE,
    payload: message
})

export const updateMessageStatus = message => ({
    type: UPDATE_MESSAGE_STATUS,
    payload: message
})