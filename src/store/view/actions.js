export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CREATE_DIALOG = 'CREATE_DIALOG';

export const openDialog = details => ({
    type: OPEN_DIALOG,
    payload: details
});

export const createDialog = details => ({
    type: CREATE_DIALOG,
    payload: details
});