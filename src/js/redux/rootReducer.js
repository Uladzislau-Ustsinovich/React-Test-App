import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {tableReducer} from "./tableReducer";
import {gitReposReducer} from "./gitReposReducer";

const rootReducer = combineReducers({
    gitRepos: gitReposReducer,
    table: tableReducer
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))