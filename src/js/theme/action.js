import {CHANGE_THEME} from "./types";

export function setTheme(condition) {
    return {
        type: CHANGE_THEME,
        payload: condition
    }
}