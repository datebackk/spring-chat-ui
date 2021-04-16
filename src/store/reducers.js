import {currentUserReducer} from "./currentUser/reducers";
import {navbarReducer} from "./navbar/reducers";
import {viewReducer} from "./view/reducers";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {chatsReducer} from "./page/chats/reducers";
import {messagesReducer} from "./page/chats/messages/reducers";

const {combineReducers} = require("redux");

const RootReducer = combineReducers({
    currentUser: currentUserReducer,
    navbar: navbarReducer,
    chats: chatsReducer,
    currentDialogMessages: messagesReducer,
    view: viewReducer
});

export const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));