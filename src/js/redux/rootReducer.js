import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {modalReducer} from "../components/Table/Modal/ModalReducer/modalReducer";
import {gitReposReducer} from "./gitReposReducer";
import {themeReducer} from "../theme/themeReducer";

const rootReducer = combineReducers({
    gitRepos: gitReposReducer,
    modal: modalReducer,
    theme: themeReducer
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))