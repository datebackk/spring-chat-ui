import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {persistStore} from "redux-persist";
import RootReducer from "./root-reducers";

export const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);

export default { store, persistor };