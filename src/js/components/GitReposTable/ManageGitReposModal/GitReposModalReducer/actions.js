import {SHOW_EDIT, SHOW_MODAL} from "./types";

export function showModal(condition) {
    return {
        type: SHOW_MODAL,
        payload: condition
    }
}

export function setEdit(condition) {
    return {
        type: SHOW_EDIT,
        payload: condition
    }
}