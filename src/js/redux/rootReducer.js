import {combineReducers} from "redux";
import {appReducer} from "./appReducer";
import {dataReducer} from "./dataReducer";


export const rootReducer = combineReducers({
    data: dataReducer,
    app: appReducer
})