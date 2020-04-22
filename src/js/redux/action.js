import {FETCH_DATA, HIDE_LOADER, SHOW_LOADER} from "./types";
import fetcher from "../fetcher";


export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function fetchMembers() {
    return async dispatch => {
        try {
            dispatch(showLoader())
            fetcher.get('https://api.github.com/users/facebook/repos')
                .then(responce => dispatch({type: FETCH_DATA, payload: responce}))
                .then(() => dispatch(hideLoader()))
        } catch (e) {
            console.log(e);
        }
    }
}