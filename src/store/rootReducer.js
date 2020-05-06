import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {gitReposTableReducer} from "../app/gitReposTable/state/gitReposTable.reducer";

const rootReducer = combineReducers({
    gitRepos: gitReposTableReducer,
})

export const store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))