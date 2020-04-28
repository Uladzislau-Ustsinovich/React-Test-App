import React, {useEffect, useState} from 'react'
import {Table} from "./components/Table/Table";
import {Switch, Route} from 'react-router-dom';
import {Header} from "./components/Header/Header";
import {Charts} from "./components/Charts/Charts";
import {ThemeProvider} from "styled-components";
import {lightTheme, darkTheme} from "./theme/theme";
import {GlobalStyles} from "./theme/global";
import {useDispatch, useSelector} from "react-redux";
import {setTheme} from "./redux/action";

function App() {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.app.theme);


    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && dispatch(setTheme(localTheme));
    }, []);

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <>
                <GlobalStyles/>
                <Header/>
                <Switch>
                    <Route exact path="/" render={() => <Table/>}/>
                    <Route path='/Chart' render={() => <Charts/>}/>
                </Switch>
            </>
        </ThemeProvider>
    )
}

export default App
