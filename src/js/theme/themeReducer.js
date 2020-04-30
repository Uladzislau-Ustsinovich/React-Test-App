import {CHANGE_THEME} from "./types";

const initialState = {
    themeCondition: ""
}

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME: {
            return {...state, themeCondition: action.payload};
        }
        default:
            return state
    }
}