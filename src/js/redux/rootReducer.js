import {FETCH_DATA, HIDE_LOADER, SHOW_LOADER} from "./types";

const initialState = {
    data: [],
    loading: false
}

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loading: true}
        case HIDE_LOADER:
            return {...state, loading: false}
        case FETCH_DATA:
            return {...state, data: action.payload}
        default:
            return state
    }
}