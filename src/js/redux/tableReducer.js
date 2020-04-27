import {SHOW_EDIT, SHOW_MODAL} from "./types";

const initialState = {
    isModalShow: false,
    isEdit: false,
}

export const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {...state, isModalShow: action.payload};
        case SHOW_EDIT:
            return {...state, isEdit: action.payload};
        default:
            return state
    }
}