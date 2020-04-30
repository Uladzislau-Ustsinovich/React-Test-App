import React from 'react'
import {ToggleContainer} from "./Toggle.styled";
import {useDispatch, useSelector} from "react-redux";
import {setTheme} from "../../../theme/action";

export const Toggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.themeCondition);

    const changeHandler = () =>{
        if (theme === 'light') {
            window.localStorage.setItem('theme', 'dark')
            dispatch(setTheme('dark'));
        } else {
            window.localStorage.setItem('theme', 'light')
            dispatch(setTheme('light'));
        }
    };

    return (
        <ToggleContainer>
            <label className="switch">
                <input type="checkbox" onClick={changeHandler}/>
                <span className="slider round"/>
            </label>
        </ToggleContainer>
    )
}

