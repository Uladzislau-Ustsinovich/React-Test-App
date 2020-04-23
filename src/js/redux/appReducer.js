import {HIDE_LOADER, SHOW_EDIT, SHOW_LOADER, SHOW_MODAL} from "./types";

const initialState = {
    loading: false,
    isModalShow: false,
    isEdit: false,
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loading: true};
        case HIDE_LOADER:
            return {...state, loading: false};
        case SHOW_MODAL:
            return {...state, isModalShow: action.payload};
        case SHOW_EDIT:
            return {...state, isEdit: action.payload};
        default:
            return state
    }
}