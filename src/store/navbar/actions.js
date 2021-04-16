export const CHANGE_ACTIVE_TAB = 'CHANGE_ACTIVE_TAB';

export const changeActiveTab = tabName => ({
    type: CHANGE_ACTIVE_TAB,
    payload: tabName
});