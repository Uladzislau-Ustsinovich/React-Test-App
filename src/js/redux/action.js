import {
    ADD, CHANGE_THEME,
    DELETE,
    DUBLICATE,
    EDIT,
    FETCH_DATA,
} from "./types";
import {v4 as uuidv4} from 'uuid';
import fetcher from "../services/fetcher";

const URL = 'https://api.github.com/users/facebook/repos';


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

export function addRow(data) {
    return {
        type: ADD,
        payload: data
    }
}

export function editRow(data) {
    return {
        type: EDIT,
        payload: data
    }
}

export function fetchMembers() {
    return async dispatch => {
        try {
            fetcher.get(URL)
                .then(responce => responce.map((i) => {
                    return {
                        _id: uuidv4(),
                        id: i.id,
                        name: i.name,
                        forks: i.forks,
                        watchers: i.watchers,
                        issues: i.open_issues
                    }
                }))
                .then(responce => dispatch({type: FETCH_DATA, payload: responce}))
        } catch (e) {
            console.log(e);
        }
    }
}