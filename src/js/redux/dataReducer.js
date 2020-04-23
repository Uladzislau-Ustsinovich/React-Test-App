import {ADD, DELETE, DUBLICATE, EDIT, FETCH_DATA, SET_ID} from "./types";

const initialState = {
    data: [],
    _id: 0,
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case DUBLICATE: {
            let newDate = JSON.parse(JSON.stringify(state.data));
            let id = state._id;
            for (let ind = 0; ind < action.payload.length; ind++) {
                let index = newDate.findIndex(x => x._id === action.payload[ind]._id);
                newDate.splice(index, 0, action.payload[ind]);
                newDate[index + 1]._id = ++id;
            }
            return {...state, data: newDate, _id: id};
        }
        case DELETE:
            return {
                ...state, data: state.data.filter((i) => {
                    for (let ind = 0; ind < action.payload.length; ind++)
                        if (i._id === action.payload[ind])
                            return false;
                    return true;
                })
            };
        case EDIT: {
            let newDate = state.data.slice();
            newDate[state.data.findIndex(x => x._id === action.payload._id)] = action.payload;
            // newDate.splice(index, 0, action.payload[ind]);
            // newDate[index + 1]._id = ++id;
            return {...state, data: newDate};
        }
        case ADD:
            action.payload._id = ++state._id;
            return {...state, data: state.data.concat(action.payload)};
        case SET_ID:
            return {...state, _id: action.payload};
        case FETCH_DATA:
            return {...state, data: action.payload};
        default:
            return state
    }
}