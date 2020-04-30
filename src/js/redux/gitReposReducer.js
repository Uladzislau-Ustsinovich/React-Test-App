import {ADD, DELETE, DUBLICATE, EDIT, FETCH_DATA} from "./types";
import {v4 as uuidv4} from 'uuid';

const initialState = {
    data: [],
    editRow: {}
}

export const gitReposReducer = (state = initialState, action) => {
    switch (action.type) {
        case DUBLICATE: {
            const newData = [...state.data];
            action.payload.forEach(element => {
                let index = newData.findIndex(x => x._id === element);
                const newRow = {
                    ...newData[index],
                    _id: uuidv4(),
                };
                newData.splice(index, 0, newRow);
            })
            return {...state, data: newData};
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
        //    Пробовал переделать по красивому, но работало неправильно, удаляло ток последний элемент из всего массива
        // ...state, data: state.data.filter((i) => {
        //     let cond;
        //     action.payload.forEach(element =>
        //         i._id === element ? cond = false : cond = true);
        //     return cond;
        // })
        // };
        case EDIT: {
            let newDate = state.data.slice();
            newDate[state.data.findIndex(x => x._id === action.payload._id)] = action.payload;
            return {...state, data: newDate};
        }
        case ADD: {
            action.payload._id = uuidv4();
            return {...state, data: state.data.concat(action.payload)};
        }
        case FETCH_DATA:
            return {...state, data: action.payload};
        default:
            return state
    }
}