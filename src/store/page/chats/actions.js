export const SET_CHATS = 'SET_CHATS';
export const UPDATE_CHATS = 'UPDATE_CHATS';

export const setChats = chats => ({
    type: SET_CHATS,
    payload: chats
});

export const updateChats = chat => ({
    type: UPDATE_CHATS,
    payload: chat
})