export const SET_CHATS = 'SET_CHATS';
export const UPDATE_CHATS = 'UPDATE_CHATS';
export const STRONG_UPDATE = 'STRONG_UPDATE';
export const SOFT_UPDATE = 'SOFT_UPDATE';
export const ADD_CHAT = 'ADD_CHAT';

export const setChats = chats => ({
    type: SET_CHATS,
    payload: chats
});


export const strongUpdate = (chat, message) => ({
    type: STRONG_UPDATE,
    payload: {chat, message}
});

export const softUpdate = (chat, message) => ({
   type: SOFT_UPDATE,
   payload: {chat, message}
});

export const addChat = (chat) => ({
    type: ADD_CHAT,
    payload: chat
})