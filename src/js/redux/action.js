import {
    ADD,
    DELETE,
    DUBLICATE,
    EDIT,
    FETCH_DATA,
    HIDE_LOADER,
    SET_ID,
    SHOW_EDIT,
    SHOW_LOADER,
    SHOW_MODAL
} from "./types";
import fetcher from "../fetcher";


export function dublicateRows(data) {
    return {
        type: DUBLICATE,
        payload: data
    }
}

export function deleteRows(id) {
    return {
        type: DELETE,
        payload: id
    }
}

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

export function showModal(condition) {
    return {
        type: SHOW_MODAL,
        payload: condition
    }
}

export function addRow(data) {
    return {
        type: ADD,
        payload: data
    }
}

export function setIdCounter(num) {
    return {
        type: SET_ID,
        payload: num
    }
}

export function editRow(data) {
    return {
        type: EDIT,
        payload: data
    }
}

export function isEdit(condition) {
    return {
        type: SHOW_EDIT,
        payload: condition
    }
}

export function fetchMembers() {
    return async dispatch => {
        try {
            let _id = 0;
            dispatch(showLoader());
            fetcher.get('https://api.github.com/users/facebook/repos')
                .then(responce => responce.map((i, ind) => {
                    _id = ind;
                    return {
                        _id: ind,
                        id: i.id,
                        name: i.name,
                        forks: i.forks,
                        watchers: i.watchers,
                        stargazers_count: i.stargazers_count
                    }
                }))
                .then(responce => dispatch({type: FETCH_DATA, payload: responce}))
                .then(() => dispatch({type: SET_ID, payload: _id}))
                .then(() => dispatch(hideLoader()))
        } catch (e) {
            console.log(e);
        }
    }
}