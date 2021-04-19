import {currentUserReducer} from "./currentUser/reducers";
import {navbarReducer} from "./navbar/reducers";
import {viewReducer} from "./view/reducers";
import {chatsReducer} from "./page/chats/reducers";
import {messagesReducer} from "./page/chats/messages/reducers";
import { persistReducer } from "redux-persist";
import sessionStorage from 'redux-persist/lib/storage/session'
import {stompClientReducer} from "./stomClient/reducers";

const {combineReducers} = require("redux");

// const localStorageConfig = {
//     key: 'local',
//     storage: storage,
//     blacklist: ['navbar'],
//     stateReconciler: autoMergeLevel2
// }

const sessionStorageConfig = {
    key: 'session',
    storage: sessionStorage,
    whitelist: ['currentUser']
}


const RootReducer = combineReducers({
    currentUser: currentUserReducer,
    navbar: navbarReducer,
    chats: chatsReducer,
    currentDialogMessages: messagesReducer,
    view: viewReducer,
    stompClient: stompClientReducer
});

export default persistReducer(sessionStorageConfig, RootReducer);