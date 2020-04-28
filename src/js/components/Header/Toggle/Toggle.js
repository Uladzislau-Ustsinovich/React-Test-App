import React, {useEffect, useState} from 'react'
import {ToggleContainer} from "./Toggle.styled";
import {useDispatch, useSelector} from "react-redux";
import {setTheme} from "../../../redux/action";

export const Toggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.app.theme);

    const changeHandler = () =>{
        if (theme === 'light') {
            window.localStorage.setItem('theme', 'dark')
            dispatch(setTheme('dark'));
            setChecked(true);
        } else {
            window.localStorage.setItem('theme', 'light')
            dispatch(setTheme('light'));
            setChecked(false);
        }
    };

    return (
        <ToggleContainer>
            <label className="switch">
                <input type="checkbox" onClick={changeHandler}/>
                <span className="slider round"></span>
            </label>
        </ToggleContainer>
    )
}

