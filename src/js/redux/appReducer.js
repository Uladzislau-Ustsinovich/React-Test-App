import {CHANGE_THEME} from "./types";

const initialState = {
    theme: ""
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME: {
            return {...state, theme: action.payload};
        }
        default:
            return state
    }
}